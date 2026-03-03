import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

async function appendToSheet(data: {
    name: string
    email: string
    guests: string
    attendance: string
    meal: string
    song: string
    message: string
}) {
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })

    const timestamp = new Date().toLocaleString('en-GB', {
        timeZone: 'Africa/Lagos',
        dateStyle: 'short',
        timeStyle: 'short',
    })

    await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: 'Sheet1!A:H',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
            values: [[
                timestamp,
                data.name,
                data.email,
                data.guests,
                data.attendance === 'yes' ? 'Attending' : 'Not Attending',
                data.meal || 'Not specified',
                data.song || 'None',
                data.message || 'None',
            ]],
        },
    })
}

async function sendConfirmationEmail(data: {
    name: string
    email: string
    attendance: string
    meal: string
}) {
    const isAttending = data.attendance === 'yes'

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body style="margin:0;padding:0;background:#020B18;font-family:Georgia,serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#020B18;padding:40px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#040f1e;border:1px solid rgba(212,168,67,0.3);max-width:600px;width:100%;">
              
              <!-- Header -->
              <tr>
                <td align="center" style="padding:48px 40px 32px;border-bottom:1px solid rgba(212,168,67,0.15);">
                  <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:rgba(212,168,67,0.7);">
                    ${isAttending ? 'See You There' : 'We Understand'}
                  </p>
                  <h1 style="margin:0;font-family:Georgia,serif;font-size:48px;color:#d4a843;font-weight:400;letter-spacing:2px;">
                    James &amp; Eleanor
                  </h1>
                  <p style="margin:12px 0 0;font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.3);">
                    April 12, 2025
                  </p>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding:40px 40px 32px;">
                  <p style="margin:0 0 20px;font-size:18px;color:rgba(255,255,255,0.8);line-height:1.7;">
                    Dear ${data.name},
                  </p>

                  ${isAttending ? `
                  <p style="margin:0 0 20px;font-size:16px;color:rgba(255,255,255,0.6);line-height:1.8;">
                    We are absolutely delighted that you will be joining us on our special day. Your presence means the world to us.
                  </p>
                  <p style="margin:0 0 32px;font-size:16px;color:rgba(255,255,255,0.6);line-height:1.8;">
                    Your RSVP has been confirmed. Here is a summary:
                  </p>

                  <!-- Details box -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(212,168,67,0.05);border:1px solid rgba(212,168,67,0.2);margin-bottom:32px;">
                    <tr>
                      <td style="padding:24px 28px;">
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
                              <span style="font-family:Arial,sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:rgba(212,168,67,0.6);">Date</span><br>
                              <span style="font-size:15px;color:rgba(255,255,255,0.8);">Saturday, April 12, 2025</span>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
                              <span style="font-family:Arial,sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:rgba(212,168,67,0.6);">Time</span><br>
                              <span style="font-size:15px;color:rgba(255,255,255,0.8);">Ceremony at 2:00 PM, Reception from 5:00 PM</span>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
                              <span style="font-family:Arial,sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:rgba(212,168,67,0.6);">Venue</span><br>
                              <span style="font-size:15px;color:rgba(255,255,255,0.8);">The Grand Pavilion, Victoria Island, Lagos</span>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
                              <span style="font-family:Arial,sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:rgba(212,168,67,0.6);">Dress Code</span><br>
                              <span style="font-size:15px;color:rgba(255,255,255,0.8);">Black Tie</span>
                            </td>
                          </tr>
                          ${data.meal ? `
                          <tr>
                            <td style="padding:8px 0;">
                              <span style="font-family:Arial,sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:rgba(212,168,67,0.6);">Your Meal</span><br>
                              <span style="font-size:15px;color:rgba(255,255,255,0.8);">${data.meal}</span>
                            </td>
                          </tr>` : ''}
                        </table>
                      </td>
                    </tr>
                  </table>

                  <p style="margin:0 0 20px;font-size:16px;color:rgba(255,255,255,0.6);line-height:1.8;">
                    We look forward to celebrating with you. If you have any questions before the big day, feel free to reply to this email.
                  </p>
                  ` : `
                  <p style="margin:0 0 20px;font-size:16px;color:rgba(255,255,255,0.6);line-height:1.8;">
                    We are sorry you won't be able to join us, but we completely understand. You will be in our hearts and thoughts on the day.
                  </p>
                  <p style="margin:0 0 20px;font-size:16px;color:rgba(255,255,255,0.6);line-height:1.8;">
                    We hope to celebrate with you another time soon.
                  </p>
                  `}

                  <p style="margin:32px 0 0;font-size:16px;color:rgba(255,255,255,0.5);font-style:italic;line-height:1.8;">
                    With love,<br>
                    <span style="color:#d4a843;">James &amp; Eleanor</span>
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td align="center" style="padding:24px 40px;border-top:1px solid rgba(212,168,67,0.15);">
                  <p style="margin:0;font-family:Arial,sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.2);">
                    April 12, 2025 &nbsp;&middot;&nbsp; Lagos, Nigeria
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `

    await resend.emails.send({
        from: 'Abdul-Hakeem & Ruqayyah <onboarding@resend.dev>',
        to: process.env.RESEND_TEST_EMAIL!,
        // to: data.email,
        subject: isAttending
            ? 'Your RSVP is confirmed - Abdul-Hakeem & Ruqayyah'
            : 'We will miss you - Abdul-Hakeem & Ruqayyah',
        html,
    })
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { name, email, guests, attendance, meal, song, message } = body

        console.log('Body received:', body)
        console.log('ENV CHECK:', {
            resend: !!process.env.RESEND_API_KEY,
            sheetId: !!process.env.GOOGLE_SHEET_ID,
            serviceEmail: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            privateKey: !!process.env.GOOGLE_PRIVATE_KEY,
        })

        // Validate required fields
        if (!name || !email || !attendance) {
            return NextResponse.json(
                { error: 'Name, email and attendance are required' },
                { status: 400 }
            )
        }

        // Save to Google Sheets
        await appendToSheet({ name, email, guests, attendance, meal, song, message })

        // Send confirmation email
        await sendConfirmationEmail({ name, email, attendance, meal })

        return NextResponse.json({ success: true }, { status: 200 })

    } catch (error) {
        console.error('RSVP error:', error)
        return NextResponse.json(
            { error: 'Something went wrong. Please try again.' },
            { status: 500 }
        )
    }
}