import { ExamRoutine } from '@prisma/client';
import { Student } from '@prisma/client';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 20 },
  header: { fontSize: 20, textAlign: 'center', marginBottom: 10 },
  section: { marginBottom: 10 },
});

const AdmitCard = ({ student, exam }: { student: Student; exam: ExamRoutine }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Exam Admit Card</Text>
      <View style={styles.section}>
        <Text>Name: {student.name}</Text>
        <Text>Class: {exam.classId}</Text>
        <Text>Exam: {exam.title}</Text>
        <Text>Subject: {exam.subjectId}</Text>
        <Text>Date & Time: {new Date(exam.startTime).toLocaleString()}</Text>
      </View>
    </Page>
  </Document>
);

export default AdmitCard;
