import 'dotenv/config'


export const loadPost = async () => {
  const res = await fetch("http://localhost:5000/posts");
  const data = await res.json();
  return data;
};

export const login = async (formValue) => {
  try {
      const res = await fetch(`http://localhost:/5000/auth/login`, {
          headers: {
              "Content-Type": "application/json",
          },
          method: 'POST',
          body:JSON.stringify (formValue)
      })
      if(res.ok){
          const data = await res.json();
          return data
      }else {const errorData = await res.json()
          return {error: errorData.message || 'Errore di login'}
      }
       
  } catch (error) {
      return {error: 'Errore, riporva più tardi'} 
  }    
}

export const newPost = async (formValue, cover) => {
  const formData = new FormData();
  formData.append("title", formValue.title);
  formData.append("cover", cover);
  formData.append("category", formValue.category);
  formData.append("content", formValue.content);
  formData.append("readTime", JSON.stringify(formValue.readTime));
  formData.append("author", formValue.author);
  const res = await fetch("http://localhost:5000/posts",{
    // headers: {
    //   // Authorization: `Bearer ${localStorage.getItem("token")}`,
    // },
    method: "POST",
    body: formData
  })
  const data = await res.json();
  return data;
};

export const search = () => {
  
}
