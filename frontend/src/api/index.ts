import { getItem } from "@/lib/storage";
import axios from "axios";
const URL = `${process.env.NEXT_PUBLIC_ENV_BAKEND_URL}/api/v1`;
// ====================Login-signIn================================
const login = `${URL}/login`;
const signIn = `${URL}/sign-in`;
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
// ===========================================================
// =====================HOME==================================
const Home = `${URL}/Home`;
const student_dashboard = `${Home}/student-dashboard`;
const teacher_dashboard = `${Home}/teacher-dashboard`;
export const student_dashboard_api = async () =>
  axios.get(student_dashboard, {
    headers: {
      Authorization: `Bearer ${await getItem("token")}`,
    },
  });
export const teacher_dashboard_api = async () =>
  axios.get(teacher_dashboard, {
    headers: {
      Authorization: `Bearer ${await getItem("token")}`,
    },
  });
// ======================================================
// =======================Student==============================
const student_url = `${URL}/student`;
const submit_answer = `${student_url}/submit-answer`;
const update_answer = `${student_url}/update-answer`;
const delete_answer = `${student_url}/delete-answer`;
const get_answer = `${student_url}/get`;

// =========================================================
// ======================Teacher===================================
const teacher_url = `${URL}/teacher`;
const get_questions = `${teacher_url}/get/questions`;
const get_catalog = `${teacher_url}/get/catalog`;
const delete_question = `${teacher_url}/delete-question`;
const post_question = `${teacher_url}/post-question`;
const update_question = `${teacher_url}/update-question`;
const delete_catalog = `${teacher_url}/delete-catalog`;
const post_catalog = `${teacher_url}/post-catalog`;
export const get_questions_api = async () =>
  axios.get(get_questions, {
    headers: {
      Authorization: `Bearer ${await getItem("token")}`,
    },
  });
export const post_question_api = async (data: {
  q: string;
  testCase: string;
  Cid: string;
}) =>
  axios.post(post_question, data, {
    headers: {
      Authorization: `Bearer ${await getItem("token")}`,
    },
  });
export const delete_catalog_api = async (id: string) =>
  axios.delete(delete_catalog + "/" + id, {
    headers: {
      Authorization: `Bearer ${await getItem("token")}`,
    },
  });
export const delete_question_api = async (id: string) =>
  axios.delete(delete_question + "/" + id, {
    headers: {
      Authorization: `Bearer ${await getItem("token")}`,
    },
  });
export const post_catalog_api = async (data: { name: string }) =>
  axios.post(post_catalog, data, {
    headers: {
      Authorization: `Bearer ${await getItem("token")}`,
    },
  });
export const get_catalog_api = async () =>
  axios.get(get_catalog, {
    headers: {
      Authorization: `Bearer ${await getItem("token")}`,
    },
  });

// ====================================================
