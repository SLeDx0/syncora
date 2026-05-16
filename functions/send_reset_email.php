<?php

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

$autoloadPath = __DIR__ . '/../vendor/autoload.php';
if (is_file($autoloadPath)) {
    require_once $autoloadPath;
}

function sendPasswordResetEmail($toEmail, $toName, $resetCode)
{
    if (!class_exists(PHPMailer::class)) {
        error_log('PHPMailer bulunamadi. Composer ile phpmailer/phpmailer paketini kurun.');
        return false;
    }

    $mailConfig = require __DIR__ . '/../config/mail.php';

    if (empty($mailConfig['host']) || empty($mailConfig['username']) || empty($mailConfig['password'])) {
        error_log('SMTP ayarlari eksik. MAIL_USERNAME/GMAIL_USER ve MAIL_PASSWORD/GMAIL_APP_PASSWORD gerekli.');
        return false;
    }

    $fromEmail = $mailConfig['from_email'] ?: $mailConfig['username'];
    $fromName = $mailConfig['from_name'] ?: 'Syncora';
    $plainName = trim((string) $toName) !== '' ? trim((string) $toName) : 'Degerli Kullanici';
    $safeName = htmlspecialchars($plainName, ENT_QUOTES, 'UTF-8');
    $safeCode = htmlspecialchars((string) $resetCode, ENT_QUOTES, 'UTF-8');

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = $mailConfig['host'];
        $mail->SMTPAuth = true;
        $mail->Username = $mailConfig['username'];
        $mail->Password = $mailConfig['password'];
        $encryption = strtolower((string) ($mailConfig['encryption'] ?? 'tls'));
        if ($encryption === 'ssl' || $encryption === 'smtps') {
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        } elseif ($encryption === 'none' || $encryption === 'false' || $encryption === '0') {
            $mail->SMTPSecure = false;
            $mail->SMTPAutoTLS = false;
        } else {
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        }
        $mail->Port = (int) $mailConfig['port'];
        $mail->CharSet = 'UTF-8';

        $mail->setFrom($fromEmail, $fromName);
        $mail->addAddress($toEmail, $plainName ?: $toEmail);

        $logoPath = __DIR__ . '/../assets/syncora_email_pp_512.png';
        $bannerPath = __DIR__ . '/../assets/syncora_email_banner_680x240.gif';
        $hasLogo = is_file($logoPath);
        $hasBanner = is_file($bannerPath);

        if ($hasLogo) {
            $mail->addEmbeddedImage($logoPath, 'syncora_logo');
        }

        if ($hasBanner) {
            $mail->addEmbeddedImage($bannerPath, 'syncora_banner');
        }

        $mail->isHTML(true);
        $mail->Subject = 'Syncora sifre sifirlama kodunuz';
        $mail->Body = getPasswordResetEmailTemplate($safeName, $safeCode, $hasLogo, $hasBanner);
        $mail->AltBody = "Merhaba {$plainName}, Syncora sifre sifirlama kodunuz: {$resetCode}. Bu kod 15 dakika gecerlidir.";

        return $mail->send();
    } catch (Exception $e) {
        error_log('Mail gonderim hatasi: ' . $mail->ErrorInfo);
        return false;
    }
}

function getPasswordResetEmailTemplate($userName, $resetCode, $hasLogo = true, $hasBanner = true)
{
    $bannerHtml = $hasBanner
        ? '<img src="cid:syncora_banner" width="620" alt="Syncora" style="width:100%;max-width:620px;display:block;">'
        : '<div style="padding:34px 24px;color:#7ddcff;font-size:28px;font-weight:bold;letter-spacing:2px;">SYNCORA</div>';

    $logoHtml = $hasLogo
        ? '<img src="cid:syncora_logo" width="92" height="92" alt="Syncora Logo" style="border-radius:50%;display:block;margin-bottom:18px;box-shadow:0 0 25px rgba(0,174,255,0.55);">'
        : '<div style="width:92px;height:92px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin-bottom:18px;background:#061b38;color:#7ddcff;font-size:42px;font-weight:bold;box-shadow:0 0 25px rgba(0,174,255,0.55);">S</div>';

    return '
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <title>Syncora Sifre Sifirlama</title>
</head>
<body style="margin:0;padding:0;background:#050b18;font-family:Arial,Helvetica,sans-serif;color:#ffffff;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#050b18;padding:30px 0;">
        <tr>
            <td align="center">
                <table width="620" cellpadding="0" cellspacing="0" style="max-width:620px;background:#081225;border-radius:18px;overflow:hidden;border:1px solid rgba(0,174,255,0.35);box-shadow:0 0 35px rgba(0,174,255,0.18);">
                    <tr>
                        <td align="center" style="background:#020712;">
                            ' . $bannerHtml . '
                        </td>
                    </tr>

                    <tr>
                        <td align="center" style="padding:30px 30px 10px;">
                            ' . $logoHtml . '
                            <h1 style="margin:0;color:#7ddcff;font-size:26px;letter-spacing:1px;">
                                Sifre Sifirlama Talebi
                            </h1>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:10px 42px 0;color:#dbeafe;font-size:15px;line-height:1.7;">
                            <p style="margin:0 0 14px;">Merhaba <strong style="color:#ffffff;">' . $userName . '</strong>,</p>

                            <p style="margin:0 0 14px;">
                                Syncora hesabiniz icin sifre sifirlama talebi aldik.
                                Sifrenizi yenilemek icin asagidaki dogrulama kodunu sifre sifirlama ekranina girin.
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td align="center" style="padding:24px 42px;">
                            <div style="display:inline-block;background:linear-gradient(135deg,#061b38,#092b57);border:1px solid #1fb6ff;border-radius:16px;padding:18px 34px;box-shadow:0 0 28px rgba(31,182,255,0.35);">
                                <div style="font-size:13px;color:#9edcff;letter-spacing:1px;margin-bottom:8px;">
                                    DOGRULAMA KODUNUZ
                                </div>
                                <div style="font-size:36px;font-weight:bold;letter-spacing:8px;color:#ffffff;">
                                    ' . $resetCode . '
                                </div>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:0 42px 18px;color:#dbeafe;font-size:15px;line-height:1.7;">
                            <p style="margin:0 0 12px;">
                                Bu kod <strong style="color:#7ddcff;">15 dakika</strong> boyunca gecerlidir.
                            </p>

                            <p style="margin:0 0 12px;">
                                Bu islemi siz baslatmadiysaniz bu e-postayi dikkate almayin.
                                Hesabiniz guvende kalir.
                            </p>

                            <p style="margin:0;color:#ffcc66;">
                                Guvenliginiz icin dogrulama kodunuzu kimseyle paylasmayin.
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:22px 42px 34px;">
                            <div style="background:rgba(255,255,255,0.04);border-radius:14px;padding:16px;color:#9fb8d8;font-size:13px;line-height:1.6;border:1px solid rgba(255,255,255,0.06);">
                                Bu e-posta otomatik olarak gonderilmistir. Lutfen bu e-postaya yanit vermeyin.
                                <br>
                                <strong style="color:#7ddcff;">Syncora Guvenlik Ekibi</strong>
                            </div>
                        </td>
                    </tr>
                </table>

                <div style="color:#53657d;font-size:12px;margin-top:18px;">
                    &copy; ' . date('Y') . ' Syncora. Tum haklari saklidir.
                </div>
            </td>
        </tr>
    </table>
</body>
</html>';
}
