import axios from 'axios';

async function test() {
  try {
    const res = await axios.post("http://localhost:3000/api/auth/register", {
      username: "u12345", email: "invalidemail", password: "p"
    });
    console.log(res.data);
  } catch (e) {
    console.error(e.response ? e.response.data : e.message);
  }
}
test();
