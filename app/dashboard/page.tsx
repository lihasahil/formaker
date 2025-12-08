import CreateForm from "./_components/CreateForm";

function page() {
  return (
    <div className="p-10 flex justify-between">
      <h2 className="text-black font-bold text-2xl">Dashboard</h2>
      <CreateForm />
    </div>
  );
}

export default page;
