import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { auth } from "@clerk/nextjs/server";
import ClientPaymentList from "@/components/ClientPaymentList";

const PaymentList = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
  const { sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const { page } = searchParams;
  const p = page ? parseInt(page) : 1;

  const [students, count] = await prisma.$transaction([
    prisma.student.findMany({
      include: {
        payments: {
          select: {
            id: true,
            amount: true,
            status: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.student.count(),
  ]);

  return <ClientPaymentList students={students} total={count} role={role} page={p} />;
};

export default PaymentList;
