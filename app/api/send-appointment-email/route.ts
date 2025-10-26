import AppointmentConfirmationEmail from "@/components/emails/AppointmentConfirmationEmail";
import resend from "@/lib/resend";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
  try {
    const body = await request.json();

    const {
      userEmail,
      doctorName,
      appointmentDate,
      appointmentTime,
      appointmentType,
      duration,
      price
    } = body;

    // validate required fields
    if(!userEmail || !doctorName || !appointmentDate || !appointmentTime) {
      return NextResponse.json({error: "Missing required fields"}, {status: 400});
    }

    // send email
    const {data, error} = await resend.emails.send({
      from: "SmileDent <no-reply@resend.dev>", // don't use this in production
      to: "msadirov1997@gmail.com",
      subject: "Appointment Cofirmation - SmileDent",
      react: AppointmentConfirmationEmail({
        doctorName,
        appointmentDate,
        appointmentTime,
        appointmentType,
        duration,
        price
      }),
    });

    if(error) {
      console.error("Resend error:", error);
      return NextResponse.json({error: "Failed to send email"}, {status: 500});
    }

    return NextResponse.json(
      {message: "Email sent successfully", emailId: data?.id},
      {status: 200}
    )
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}