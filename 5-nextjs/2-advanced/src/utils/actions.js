"use server";

// server action
export const handleAction = async (formData) => {
  // inputlardaki verilere eriş
  const name = formData.get("name");
  const age = formData.get("age");

  //

  // api isteği atabilirsiniz..
  // fetch("/login",{name,age})

  console.log(name, age);
};
