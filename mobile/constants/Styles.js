import { StyleSheet } from 'react-native';
import { midnightBlue, white } from "@/constants/Colors";

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  searchBar: {
    color: white,
    marginTop: 16,
    marginBottom: 16
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: midnightBlue,
  },
  itemContainer: {
    flexGrow: 1,
  },
  item: {
    justifyContent: 'center',
    margin: 4,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
});

export default styles;