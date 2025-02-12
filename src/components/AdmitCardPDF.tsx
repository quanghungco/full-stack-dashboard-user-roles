import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    flex: 1,
  },
  photo: {
    width: 100,
    height: 120,
    border: '1px solid black',
  },
  studentInfo: {
    marginTop: 20,
    display: 'flex',
    gap: 10,
    borderBottom: '1px solid black',
    paddingBottom: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    width: 120,
    fontWeight: 'bold',
  },
  value: {
    flex: 1,
  },
  subjectsTable: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 5,
    borderBottom: '1px solid black',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 5,
    borderBottom: '1px solid black',
  },
  tableCell: {
    flex: 1,
  },
});

const AdmitCardPDF = ({ studentId, className }: { studentId: string, className: string }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image src="/logo.png" style={styles.logo} />
        <Text style={styles.title}>
          GenSchool , Barishal{'\n'}
          ADMIT CARD
        </Text>
        <View style={styles.photo}>
        <Image src="/noAvatar.png" style={styles.photo} />
        </View>
      </View>

      <View style={styles.studentInfo}>
        <Text style={styles.label}>Student Name: {studentId}</Text>
        {'\n'}
        <Text style={styles.label}>Student ID: {studentId}</Text>
        {'\n'}
        <Text style={styles.label}>Class: {className}</Text>
      </View>

      {/* Add the rest of the content following the image structure */}
      {/* Include student details, exam schedule, etc. */}
    </Page>
  </Document>
);

export default AdmitCardPDF; 