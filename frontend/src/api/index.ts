"use client";
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
const leader_bored = `${Home}/leader-broad`;
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
export const leader_bored_api = () => axios.get(leader_bored);
// ======================================================
// =======================Student==============================
const student_url = `${URL}/student`;
const submit_answer = `${student_url}/submit-answer`;
const update_answer = `${student_url}/update-answer`;
const delete_answer = `${student_url}/delete-answer`;
const get_answer = `${student_url}/get`;
const get_answers = `${student_url}/answers`;
const get_questions_s = `${student_url}/get/questions`;
export const get_answer_api = async () =>
  axios.get(get_answers, {
    headers: {
      Authorization: `Bearer ${await getItem("token")}`,
    },
  });
export const get_questions_s_api = async () =>
  axios.get(get_questions_s, {
    headers: {
      Authorization: `Bearer ${await getItem("token")}`,
    },
  });
export const get_questions_s_id_api = async (id: string) =>
  axios.get(get_questions_s + "/" + id, {
    headers: {
      Authorization: `Bearer ${await getItem("token")}`,
    },
  });
export const submit_answer_api = async (data: {
  ans: string;
  states: string;
  q: string | string[];
}) =>
  axios.post(submit_answer, data, {
    headers: {
      Authorization: `Bearer ${await getItem("token")}`,
    },
  });

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
const post_review = `${teacher_url}/answer-review`;
const get_one_ans = `${teacher_url}/answer`;
export const get_one_ans_api = async (id: string) =>
  axios.get(get_one_ans + "/" + id, {
    headers: {
      Authorization: `Bearer ${await getItem("token")}`,
    },
  });
export const post_review_api = async (
  id: string,
  data: {
    comment: string;
    status: string;
    score: string;
  }
) =>
  axios.post(post_review + "/" + id, data, {
    headers: {
      Authorization: `Bearer ${await getItem("token")}`,
    },
  });
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

export const compile = (code: string, lag: string, input: string) => {
  const formData = {
    language_id: lag,
    // encode source code in base64
    source_code: btoa(code),
    stdin: btoa(input),
  };
  const options = {
    Method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions",
    params: { base64_encoded: "true", fields: "*" },
    headers: {
      "content-type": "application/json",
      "Content-Type": "application/json",
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      "X-RapidAPI-Key": "699fc58353msh5a6c3e4f14e91f9p129e98jsnec1f56e4da5d",
    },
    data: formData,
  };

  return axios.request(options);
};
