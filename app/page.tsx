import FormBuilder from "@/components/FormBuilder";

const defaultForm = {
  id: 0,
  title: "New Form",
  description: "This is a default form",
  fields: [
    {
      id: 1,
      type: "text",
      label: "First Name",
      placeholder: "Enter your first name",
    },
    {
      id: 2,
      type: "text",
      label: "Last Name",
      placeholder: "Enter your last name",
    },
    // Add more fields as needed
  ]
};
export default function Home() {
  return (
    <>
      <FormBuilder form={ defaultForm} />
    </>
  )
}
