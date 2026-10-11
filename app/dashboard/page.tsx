import CreateForm from "./_components/CreateForm";
import FormList from "./_components/FormList";

function page() {
  return (
    <div className="p-4 sm:p-6 md:p-10">
      <h2 className="text-black flex flex-wrap gap-3 justify-between items-center font-bold text-xl sm:text-2xl">
        Dashboard <CreateForm />
      </h2>

      <FormList />
    </div>
  );
}

export default page;
