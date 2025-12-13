import CreateForm from "./_components/CreateForm";
import FormList from "./_components/FormList";

function page() {
  return (
    <div className="p-10">
      <h2 className="text-black flex justify-between font-bold text-2xl">
        Dashboard <CreateForm />
      </h2>

      <FormList />
    </div>
  );
}

export default page;
