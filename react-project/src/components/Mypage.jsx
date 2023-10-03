import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "../css/Mypage.css";
import { useEffect, useRef, useState, Fragment } from "react";
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function GridComplexExample() {
  const [userNick, setUserNick] = useState("");

  const currentPW = useRef();
  const newPW = useRef();
  const nick = useRef();

  const [updateUserData, setUpdateUserData] = useState({});

  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    axios
      .get("http://localhost:8000/user/info")
      .then((res) => {
        setUserNick(res.data.userNick[0].user_nick);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const updateUser = (e) => {
    e.preventDefault();

    setUpdateUserData({
      currentPW: currentPW.current.value,
      newPW: newPW.current.value,
      nick: nick.current.value,
    });
  };

  useEffect(() => {
    axios
      .patch("http://localhost:8000/user", updateUserData)
      .then((res) => {
        if (res.data === "ok") {
          alert('업데이트가 완료되었습니다.');
        } else {
          alert(`${res.data}`);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [updateUserData]);

  return (
    <div id="mypage-container">
      <div id="mypage-header">
        <span>마이페이지</span>
      </div>
      <Form style={{ width: 800 }} onSubmit={updateUser}>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>현재 비밀번호</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              ref={currentPW}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>새로운 비밀번호</Form.Label>
            <Form.Control type="password" placeholder="Password" ref={newPW} />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>닉네임</Form.Label>
          <Form.Control placeholder={userNick} ref={nick} />
        </Form.Group>

        <Button variant="primary" type="submit" style={{ marginBottom: 12 }}>
          회원정보 수정
        </Button>
      </Form>

      <div id="mypage-header">
        <span>회사 등록</span>
      </div>
      <Form style={{ width: 800 }}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control placeholder="1234 Main St" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Address 2</Form.Label>
          <Form.Control placeholder="Apartment, studio, or floor" />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Select defaultValue="Choose...">
              <option>Choose...</option>
              <option>...</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" id="formGridCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default GridComplexExample;
