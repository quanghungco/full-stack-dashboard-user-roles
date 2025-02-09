import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { auth } from "@clerk/nextjs/server";
import ClientPaymentList from "@/components/ClientPaymentList";

const Payments = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const { page } = searchParams;
  const p = page ? parseInt(page) : 1;
  const perPage = searchParams.perPage
    ? parseInt(searchParams.perPage)
    : ITEM_PER_PAGE;

  const [students, count] = await prisma.$transaction([
    prisma.student.findMany({
      include: {
        class: { select: { fees: true } },
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
      take: perPage,
      skip: perPage * (p - 1),
    }),
    prisma.student.count(),
  ]);
  const payments = await prisma.payment.findMany({
    where: {
      studentId: {
        in: students.map(student => student.id),
      },
    },
  });
  console.log(payments);

  

  return (
    <ClientPaymentList
      payments={payments}
      students={students}
      total={count}
      role={role}
      page={p}
      perPage={perPage}
    />
  );
};

export default Payments;
