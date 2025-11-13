type Post = {
  id:string
  title: string;
  content?: string;
  creatAt?: string;
};

type UserState = {
  name: string;
  birthday: string;
  post: Post[] | [];
};

type Action =
  | { type: "updateName"; payload: string }
  | { type: "createPost"; payload: Post }
  | { type: "updatePostTitle"; payload: Post };

export const initialUserstate = {
  name: "Nadhoir",
  birthday: "12/12/1989",
  post: [{
    id:"1",
    title:"Titre 1",
    content:"Content 1",
    creatAt:"13/11/2025"
  }],
};

export function userReducer(userState: UserState, action: Action) {
  switch (action.type) {
    case "updateName":
      return {
        ...userState,
        name: action.payload,
      };

    case "createPost":
      return {
        ...userState,
        post: [...userState.post, action.payload],
      };
    case "updatePostTitle":
      return {
        ...userState,
        post: userState.post.map((p) =>
          p.id === action.payload.id
            ? { ...p, title: action.payload.title }
            : p
        ),
      };
  }
}