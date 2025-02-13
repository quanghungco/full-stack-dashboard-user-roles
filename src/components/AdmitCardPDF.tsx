import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 30, fontFamily: 'Helvetica' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  logo: { width: 60, height: 60 },
  title: { fontSize: 24, textAlign: 'center', flex: 1 },
  photo: { width: 100, height: 120, border: '1px solid black' },
  studentInfo: { marginTop: 20, borderBottom: '1px solid black', paddingBottom: 10 },
  row: { flexDirection: 'row', marginBottom: 10 },
  label: { width: 120, fontWeight: 'bold' },
  value: { flex: 1 },
  subjectsTable: { marginTop: 20 },
  tableHeader: { flexDirection: 'row', backgroundColor: '#f0f0f0', padding: 5, borderBottom: '1px solid black' },
  tableRow: { flexDirection: 'row', padding: 5, borderBottom: '1px solid black' },
  tableCell: { flex: 1 },
});

const AdmitCardPDF = ({ studentId, studentName, className, parentName, dob, subjects }: { 
  studentId: string, 
  studentName: string, 
  className: string, 
  parentName: string, 
  dob: string, 
  subjects: { id: number; name: string }[] 
}) => (
  
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Image src="/logo.png" style={styles.logo} />
        <Text style={styles.title}>
          GenSchool, Barishal{'\n'}ADMIT CARD
        </Text>
        <Image src="/noAvatar.png" style={styles.photo} />
      </View>

      {/* Student Details */}
      <View style={styles.studentInfo}>
        <View style={styles.row}>
          <Text style={styles.label}>Student Name:</Text>
          <Text style={styles.value}>{studentName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Student ID:</Text>
          <Text style={styles.value}>{studentId}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Class:</Text>
          <Text style={styles.value}>{className}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Parent Name:</Text>
          <Text style={styles.value}>{parentName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Date of Birth:</Text>
          <Text style={styles.value}>{dob}</Text>
        </View>
      </View>

      {/* Subjects Table */}
      <View style={styles.subjectsTable}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableCell}>Subject Name</Text>
        </View>
        {subjects.map((subject, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{subject.id}-{subject.name}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default AdmitCardPDF;
