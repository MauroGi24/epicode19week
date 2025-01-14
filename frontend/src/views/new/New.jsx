import { useCallback, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./styles.css";
import { newPost } from "../../data/fetch";

// const newPost = props => {
const BlogPost = () => {
  const [text, setText] = useState("");
  const [cover, setCover] = useState("");
  // const {token, setToken} = useContext(AuthorContext)
  // const decodedToken = jwtDecode(token)

  const initialFormValue = {
    title: "",
    cover: "",
    category: "",
    readTime: {
      value: 0,
      unit: "",
    },
    // author: decodedToken.authorId,
    author: "66db3bfcb50afd3d04aad5b9",
    content: "",
  };
  const [formValue, setFormValue] = useState(initialFormValue);
  const handleChangeFormValue = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    handleChangeFormValue(event);
    setCover(event.target.files[0]);
  };

  const handleChangePost = useCallback((value) => {
    setText(draftToHtml(value));
    setFormValue({
      ...formValue,
      content: draftToHtml(value), // drafToHtml(value) prende il valore dell'editor testuale e lo converte in html
    });
  });

  return (
    <Container className="new-blog-container">
      <Form className="mt-5">
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Titolo</Form.Label>
          {/* l'onChange cattura l'evento e lo passa alla funzione */}
          <Form.Control
            size="lg"
            placeholder="Title"
            name="title"
            onChange={(event) => handleChangeFormValue(event)}
          />
        </Form.Group>
        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Categoria</Form.Label>
          <Form.Control
            size="lg"
            as="select"
            name="category"
            onChange={(event) => handleChangeFormValue(event)}
          >
            <option>Categoria 1</option>
            <option>Categoria 2</option>
            <option>Categoria 3</option>
            <option>Categoria 4</option>
            <option>Categoria 5</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="cover" className="mt-3 mb-3">
          <Form.Label>Cover</Form.Label>
          <Form.Control type="file" name="cover" onChange={handleChangeImage} />
        </Form.Group>
        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Contenuto Blog</Form.Label>

          <Editor
            value={text}
            onChange={handleChangePost}
            className="new-blog-content"
          />
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="button"
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
            onClick={() => newPost(formValue, cover)}
          >
            Invia
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default BlogPost;
