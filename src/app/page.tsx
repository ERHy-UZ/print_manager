import FileWindow from "@/components/FileWindow";
import TableData from "@/components/TableData";

export default function Home() {

  const main_file = process.env.MAIN_FILE

  return (
    <div className='mx-48 my-10'>
      <FileWindow main_file={main_file!}/>
      <TableData />
    </div>
  );
}
