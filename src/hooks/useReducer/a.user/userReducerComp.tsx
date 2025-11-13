import { useReducer, useState, type CSSProperties } from "react";
import { initialUserstate, userReducer } from "./userReducer";

export const CompReducer = () => {

    const[state, dispatch] = useReducer(userReducer, initialUserstate);
    const[editingId, setEditingId] = useState<string | null>(null);
    const[newTitle, setNewTitle] = useState("");


  return <div style={containerStyle}>
    <div style={infoStyle}>
      <h2>User Info</h2>
      <span><strong>Name:</strong> {state.name}</span>
      <span><strong>Birthday:</strong> {state.birthday}</span>
    </div>

    <div style={buttonGroupStyle}>
      <button onClick={() => dispatch({
        type: "updateName",
        payload: "Nouveau Nom"
      })}>
        Change Name
      </button>

      <button onClick={() => dispatch({
        type: "createPost",
        payload: {
          id: Date.now().toString(),
          title: "Nouveau Post",
          content: "Contenu du nouveau post",
          creatAt: new Date().toLocaleDateString()
        }
      })}>
        Add Post
      </button>
    </div>

    <div style={postsStyle}>
      <h2>Posts ({state.post.length})</h2>
      {state.post.length === 0 ? (
        <p>Aucun post</p>
      ) : (
        state.post.map((post) => (
          <div key={post.id} style={postCardStyle}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <small>Créé le: {post.creatAt}</small>

            {editingId === post.id ? (
              <div style={editFormStyle}>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Nouveau titre"
                  style={inputStyle}
                />
                <button
                  style={smallButtonStyle}
                  onClick={() => {
                    dispatch({
                      type: "updatePostTitle",
                      payload: {
                        id: post.id,
                        title: newTitle
                      }
                    });
                    setEditingId(null);
                    setNewTitle("");
                  }}
                >
                  Save
                </button>
                <button
                  style={smallButtonStyle}
                  onClick={() => {
                    setEditingId(null);
                    setNewTitle("");
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                style={smallButtonStyle}
                onClick={() => {
                  setEditingId(post.id);
                  setNewTitle(post.title);
                }}
              >
                Edit Title
              </button>
            )}
          </div>
        ))
      )}
    </div>
  </div>;
};

const containerStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  padding: "20px",
  maxWidth: "800px",
  margin: "0 auto"
};

const infoStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "15px",
  backgroundColor: "#f5f5f5",
  borderRadius: "8px"
};

const buttonGroupStyle: CSSProperties = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap"
};

const postsStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "15px"
};

const postCardStyle: CSSProperties = {
  padding: "15px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  backgroundColor: "#fff",
  display: "flex",
  flexDirection: "column",
  gap: "10px"
};

const smallButtonStyle: CSSProperties = {
  padding: "5px 10px",
  fontSize: "12px",
  alignSelf: "flex-start"
};

const editFormStyle: CSSProperties = {
  display: "flex",
  gap: "10px",
  alignItems: "center",
  marginTop: "10px"
};

const inputStyle: CSSProperties = {
  padding: "8px",
  fontSize: "14px",
  border: "1px solid #ddd",
  borderRadius: "4px",
  flex: "1"
};
