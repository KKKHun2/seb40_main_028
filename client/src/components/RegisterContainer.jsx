/* eslint-disable */

import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const Container = styled.div`
  width: 300px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #36393f;
`;

const MentDiv = styled.div`
  font-size: ${({ fontSize }) => fontSize || "13px"};

  padding: ${({ padding }) => padding || 0};
  margin-top: -2em;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
`;

const MentSpan = styled.span`
  font-size: 1.1em;
  margin-bottom: 0.3em;
  cursor: pointer;
  // & a {
  //   text-decoration: none;
  //   color: #0074cc;
  // }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  width: 100%;
  padding: 20px 10px 10px 10px;
  gap: 1em;
`;

const InputContainer = styled.div`
  margin: 0 0 5px 0;
  display: flex;
  flex-direction: column;
  align-self: center;
`;

const Errormsg = styled.p`
  color: #f97583;
  margin: 0.2em;
  font-size: 0.8em;
`;

const Label = styled.label`
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 3px;
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 260px;
  height: 35px;
  padding-left: 0.5em;
  padding-right: 0.5em;
  border: 2px solid rgb(88 101 242);
`;

const SubmitBtn = styled.input`
  margin-top: 0.6em;
  width: 260px;
  height: 2.5em;
  padding-left: 2.5em;
  padding-right: 2.5em;
  font-size: 1em;
  line-height: 1.5em;
  border: none;
  outline: none;
  color: white;
  background-color: #5865f2;
  &:hover {
    background-color: #4752c4;
  }
`;

const RegisterMent = styled.div`
  padding: 0 18px;
  margin-bottom: 16px;
  color: #6a737c;
  font-size: 12px;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export default function RegisterContainer() {
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // const url = "http://13.209.190.35:8080";
  // const url = "https://guenlog.shop";
  const URL = process.env.REACT_APP_BASE_URL;
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({ mode: onchange });

  const password = useRef();
  password.current = watch("password");

  // 실시간 입력 값 확인
  // console.log(watch("email"));

  const onRegister = async (data) => {
    // console.log("data", data);
    // console.log("이메일", data.email)
    // console.log("닉네임", data.nickname)
    // console.log("패스워드", data.password)
    // console.log("패스워드", data.passwordConfirm)

    // let userData = {
    //   email: data.email,
    //   nickname: data.displayName,
    //   password: data.password,
    // };

    try {
      // 응답 성공
      // const res = await axios.post("http://13.209.190.35:8080/users/login", {
      const res = await axios.post(`${URL}/users/signup`, {
        // 보내고자 하는 데이터
        email: data.email,
        nickname: data.nickname,
        password: data.password,
      });

      // console.log("받아온데이터", res);

      // 응답코드 201이면 회원가입 성공
      if (res.status === 201) {
        // 로그인 페이지로 이동
        alert("회원가입 성공!");
        navigate("/login");

        // console.log(res);
        // console.log("회원가입 성공 로그인 ~~~~~~~~~~~~~~~~");
        // console.log("응답 전체",res)
      }
    } catch (err) {
      // 응답 실패
      // console.log(err);

      // 에러 상세 메세지
      // console.log(err.response.data.message)

      // 에러 코드 409
      // console.log(err.response.status)

      // console.log("에러메세지: ", err.message)

      // 회원가입 실패시
      // alert("Email or Password를 확인하세요");
      if (err.response.status === 409) {
        // 서버에서 넘어온 에러메세지 출력
        alert(`${err.response.data.message}`);
      }
      // 409이외 에러처리
      else {
        alert("Email or Password를 확인하세요");
      }
    }
  };

  return (
    <MainContainer>
      <div>
        <Container>
          <Form onSubmit={handleSubmit(onRegister)}>
            <InputContainer>
              <Input
                className="w-full h-10 px-10 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline outline-none pl-[2em]"
                placeholder="Nickname"
                autoComplete="off"
                type="text"
                id="nickname"
                {...register("nickname", {
                  required: true,
                  minLength: 2,
                  maxLength: 10,
                  // 공백없는 숫자, 영문대소문자, 한글 가능
                  // pattern: /^[a-zA-Z0-9]*$/,
                  // pattern: /^([a-zA-Z가-힣]){1,8}$/,
                  pattern: /^([a-zA-Z0-9가-힣])*$/,
                })}
              />
              {errors.nickname && errors.nickname.type === "required" && (
                <Errormsg>닉네임을 입력해주세요.</Errormsg>
              )}
              {errors.nickname && errors.nickname.type === "pattern" && (
                <Errormsg>한글, 영문, 숫자을 사용하세요.</Errormsg>
              )}
              {errors.nickname && errors.nickname.type === "minLength" && (
                <Errormsg>최소 길이는 2자 이상여야 합니다.</Errormsg>
              )}
              {errors.nickname && errors.nickname.type === "maxLength" && (
                <Errormsg>최대 길이는 10자 이하여야 합니다.</Errormsg>
              )}
            </InputContainer>

            <InputContainer>
              <Input
                className="w-full h-10 px-10 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline outline-none pl-[2em]"
                placeholder="Email"
                autoComplete="off"
                type="email"
                id="email"
                {...register("email", {
                  required: true,
                  pattern: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
                  maxLength: 50,
                })}
              />
              {errors.email && errors.email.type === "required" && (
                <Errormsg>이메일을 입력해주세요.</Errormsg>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <Errormsg>이메일 형식이여야 합니다.</Errormsg>
              )}
              {errors.email && errors.email.type === "maxLength" && (
                <Errormsg>최대 길이는 50자 이하여야 합니다.</Errormsg>
              )}
            </InputContainer>
            <InputContainer>
              <Input
                className="w-full h-10 px-10 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline outline-none pl-[2em]"
                placeholder="Password"
                type="password"
                autoComplete="off"
                id="password"
                {...register("password", {
                  required: true,
                  minLength: 10,
                  // 최소 10자리 이상 영문 대소문자, 숫자, 특수문자가 각각 1개 이상
                  pattern:
                    /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{10,}$/,
                })}
              />
              {errors.password && errors.password.type === "required" && (
                <Errormsg>패스워드를 입력해주세요</Errormsg>
              )}
              {errors.password && errors.password.type === "minLength" && (
                <Errormsg> 최소 길이는 10자 이상이어야 합니다</Errormsg>
              )}
              {errors.password && errors.password.type === "pattern" && (
                <Errormsg>영문, 특수문자, 숫자 포함하세요</Errormsg>
              )}
            </InputContainer>
            <InputContainer>
              <Input
                className="w-full h-10 px-10 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline outline-none pl-[2em]"
                placeholder="Password Confirm"
                // type를 패스워드로 입력 시 어떤 값을 입력하는지 화면에 안보임 ****로 처리
                type="password"
                autoComplete="off"
                id="passwordConfirm"
                {...register("passwordConfirm", {
                  required: true,
                  validate: (value) => value === password.current,
                })}
              />
              {errors.passwordConfirm &&
                errors.passwordConfirm.type === "required" && (
                  <Errormsg>패스워드를 입력해주세요.</Errormsg>
                )}
              {errors.passwordConfirm &&
                errors.passwordConfirm.type === "validate" && (
                  <Errormsg>패스워드가 일치하지 않습니다. </Errormsg>
                )}
            </InputContainer>
            {/* 비밀번호 안내문구 */}
            <RegisterMent>
              비밀번호는 10자 이상의 영문대소문자, 특수문자, 숫자를 각각1개 이상
              포함해야합니다.
            </RegisterMent>
            {/* 회원가입 버튼 */}
            <SubmitBtn
              type="submit"
              value="Sign up"
              className="w-full h-10 px-10 text-base ease-out duration-150 placeholder-gray-600 border rounded-lg focus:shadow-outline outline-none pl-[2em]"
            />
            {error && <Errormsg>{error}</Errormsg>}
          </Form>
        </Container>
        <MentDiv className="text-gray-900">
          이미 계정이 있습니까?
          <MentSpan
            className="text-[#0074ce] hover:text-[#0aaefa]"
            onClick={() => navigate("/login")}
          >
            {" "}
            Log in
          </MentSpan>
        </MentDiv>
      </div>
    </MainContainer>
  );
}
