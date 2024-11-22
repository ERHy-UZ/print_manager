import FileWindow from "@/components/FileWindow";
import TableData from "@/components/TableData";

export default function Home() {

  const main_file = process.env.MAIN_FILE

  return (
    <>
      <header className='bg-pantone-7420 px-2 sm:px-4 md:px-5 py-3'>
        <h1 className='uppercase text-white text-sm sm:text-lg md:text-2xl font-bold'>Print Log <span className='bg-white text-pantone-7420 px-2 py-[2px]'>IFREM</span></h1>
      </header>
      <div className='mx-6 md:mx-20 lg:mx-48 my-5 lg:my-10'>
        <FileWindow main_file={main_file!} />
        <TableData />
      </div >
    </>

  );
}
