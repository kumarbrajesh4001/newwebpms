import { createSlice } from "@reduxjs/toolkit";

// const  initialState: {
//   token: "",
//   user: {},
//   methods: [],
//   suppliers: [],
//   sneakpeek: false,
// }

const sessionReducer = createSlice({
  name: "userInfo",
  initialState: {
    userKey: "",
    pageRouteName: "/",
    notiFunc:undefined,
    teamSearchFunc:undefined,
    teamsCSVData:[]
  },

  reducers: {
    setUserKey(state, action) {
      state.userKey = action.payload;

      // return { ...state, list: action.payload };
      // state.push(action.payload);
    },

    setRoutePage(state, action) {
      state.pageRouteName = action.payload;
    },

    clearRoutePage(state) {
      state.pageRouteName = "/";
    },

    removeUserKey(state) {
      // return state.filter((cv) => cv.alias !== action.payload);
      //  return { ...state, list: action.payload }
      state.userKey = "";
    },

    setNotiFunc:(state, action)=>{
      state.notiFunc = action.payload
    },

    setTeamSearchFunc:(state,action)=>{
      state.teamSearchFunc = action.payload;
    },

    setTeamsData:(state,action)=>{

      state.teamsCSVData = action.payload;

    }

  },
});

export const { setUserKey, setRoutePage, clearRoutePage, removeUserKey,setNotiFunc,setTeamSearchFunc,setTeamsData } =
  sessionReducer.actions;

export default sessionReducer.reducer;
