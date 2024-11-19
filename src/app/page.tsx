import FileList from "@/components/FileList";
import SearchBar from "@/components/SearchBar";
import TableData from "@/components/TableData";

export default function Home() {

  const main_file = process.env.MAIN_FILE

  return (
    <div className='mx-48 my-10'>
      <SearchBar />
      <FileList main_file={main_file!}/>
      <TableData />
    </div>
  );
}
