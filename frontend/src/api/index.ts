import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_ENV_BAKEND_URL}/api/v1`;

const login = `${URL}/login`;
const signIn = `${URL}/sign-in`;

const Home = `${URL}/Home`;
const student_dashboard = `${Home}/student-dashboard`;
const teacher_dashboard = `${Home}/teacher-dashboard`;

const student_url = `${URL}/student`;
const submit_answer = `${student_url}/submit-answer`;
const update_answer = `${student_url}/update-answer`;
const delete_answer = `${student_url}/delete-answer`;
const get_answer = `${student_url}/get`;

const teacher_url = `${URL}/teacher`;
const get_questions = `${teacher_url}/get/questions`;
const get_catalog = `${teacher_url}/get/catalog`;
const delete_question = `${teacher_url}/delete-question`;
const post_question = `${teacher_url}/post-question`;
const update_question = `${teacher_url}/update-question`;
const delete_catalog = `${teacher_url}/delete-catalog`;
const post_catalog = `${teacher_url}/post-catalog`;

export const Login = (data: { email: string; password: string }) => {
  return axios.post(login, data);
};
export const SignIn = (data: {
  name: string;
  username: string;
  phone_number: string;
  password: string;
  email: string;
  role: string;
}) => {
  return axios.post(signIn, data);
};
