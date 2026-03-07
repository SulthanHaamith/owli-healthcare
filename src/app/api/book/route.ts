import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { serviceId, date, timeSlot, name, email, phone, notes } = body;

    if (!serviceId || !date || !timeSlot) {
      return NextResponse.json(
        { error: "Service, date, and time slot are required" },
        { status: 400 }
      );
    }

    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });
    if (!service) {
      return NextResponse.json(
        { error: "Invalid service selected" },
        { status: 400 }
      );
    }

    const session = await getServerSession(authOptions);

    if (session?.user?.id) {
      // Logged-in patient
      const patient = await prisma.patientProfile.findUnique({
        where: { userId: session.user.id },
      });

      if (!patient) {
        return NextResponse.json(
          { error: "Patient profile not found" },
          { status: 404 }
        );
      }

      const appointment = await prisma.appointment.create({
        data: {
          patientId: patient.id,
          serviceId,
          date: new Date(date),
          timeSlot,
          notes: notes || null,
          status: "REQUESTED",
        },
      });

      return NextResponse.json(
        { message: "Appointment request created", appointment },
        { status: 201 }
      );
    }

    // Not logged in — return WhatsApp link with details
    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone are required for guest booking" },
        { status: 400 }
      );
    }

    const formattedDate = new Date(date).toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const whatsappMessage = `Hi! I'd like to book an appointment.\n\nService: ${service.name}\nDate: ${formattedDate}\nTime: ${timeSlot}\nName: ${name}\nPhone: ${phone}${email ? `\nEmail: ${email}` : ""}${notes ? `\nMessage: ${notes}` : ""}`;

    const whatsappUrl = `https://wa.me/916379610554?text=${encodeURIComponent(whatsappMessage)}`;

    return NextResponse.json({
      message: "Booking details prepared",
      whatsappUrl,
    });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Failed to process booking" },
      { status: 500 }
    );
  }
}
