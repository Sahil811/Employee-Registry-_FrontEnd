
import React from "react";
import moment from "moment"

const Styles = {
  input: {
    // height: 40,
    width: "100%",
    borderRadius: 4,
    fontSize: 18,
    padding: 16,
    // outline: "none",
    border: "1px solid #A8BDB1 ",
  },
  inputUpdate: {
    // height: 40,
    width: "50%",
    borderRadius: 4,
    textAlign: "center",
    fontSize: 18,
    padding: 16,
    // outline: "none",
    border: "1px solid #A8BDB1 "
  },
  button: {
    backgroundColor: "black",
    color: "white",
    padding: "6px 10px",
    borderRadius: 6,
    marginLeft: 8,
    outline: "none"
  },
  buttonEdit: {
    backgroundColor: "black",
    color: "white",
    padding: "6px 10px",
    borderRadius: 6,
    marginLeft: 8,
    outline: "none",
    float:"right"
  },
  buttonMain: {
    width: "100%",
    // height: 30,
    backgroundColor: "#045024 ",
    color: "white",
    padding: "16px",
    // lineHeight:30,
    borderRadius: 4,
    border: "1px solid #A8BDB1 ",
    marginLeft: 16,
    marginTop: 10,
    // outline: "none",
    textAlign: "center",
    fontSize: 18
  },
  disp: {}
};

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: "",
        id: ""
      },
      value: [...this.props.data],
      isEdit: false,
      editValue: "",
      editId: "",
      styles1:  {
        maxWidth: "200px",
        marginRight: "20px"
      }
    };
  }

  //function for input box
  handleChange = e => {
    this.setState(
      {
        name: {
          value: e.target.value,
          id: ""
        }
      },
      () => console.log(this.state.name.value)
    );
  };

  //submit function on value submit
  submit = () => {
    console.log("button");
    if (this.state.name.value === "") {
      alert("please add comment");
      return;
    }
    // this.setState(
    //   {
    //     name: {
    //       value: ""
    //     },
    //     value: [...this.state.value, this.state.name]
    //   },
    //   () => console.log(this.state)
    // );
    this.props.addHandler({
      text: this.state.name.value
    })
  };

  //remove function to remove items from comments
  remove = id => {
    // let value = this.state.value;
    // const remove = value.filter(ele => ele.id !== id);
    // this.setState({
    //   value: remove
    // });
    this.props.deleteHandler({
      commentRef: id
    })
  };

  //edit function to edit comment item
  edit = (value, id) => {
    this.setState(
      {
        isEdit: true,
        editValue: value,
        editId: id
      },
      () => console.log(id, value)
    );
  };

  //update function after edit to update item
  update = () => {
    // let value = this.state.value;
    // const item = value.filter(ele =>
    //   ele.id === this.state.editId
    //     ? (ele.value = this.state.editValue)
    //     : ele.value
    // );

    // this.setState({ value: item, isEdit: false }, () => {
    //   console.log(this.state.value);
    // });
    this.props.updateHandler({
      commentRef: this.state.editId,
      text: this.state.editValue
    })
    this.setState({
      isEdit: false,
      editValue: "",
      editId: ""
    })
  };

  render() {
    const { isEdit } = this.state;
    console.log(this.state.value, "value")

    if (!isEdit) {
      return (
        <>
          <div style={{display:"flex",justifyContent:"center",alignContent:"center"}}>
            <div
              style={{
                width: "50%",
                textAlign: "center"
                // display: "flex",
                // flexDirection: "column"
              }}
            >
              <label>
                <textarea
                  style={Styles.input}
                  value={this.state.name.value}
                  onChange={this.handleChange}
                  placeholder="add your comment.."
                />
              </label>

              <button onClick={this.submit} style={Styles.buttonMain}>
                Add comment
              </button>
            </div>
          </div>

          <div style={{ margin: 10, display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column" }}>
            {this.props.data &&
              this.props.data.map((ele, index) => (
                <div key={ele._id} style={{display:"flex", 
                justifyContent:"center",alignItems:"center",
                 margin:20, width:600, backgroundColor:"#E2E5F9",
                 textAlign:"left", padding:10, borderRadius:4,overflow:"auto"}}>
                   <span
                    style={{ textDecoration: `${this.state.styles1}`, margin: "20px" }}
                    onClick={() => {
                      this.setState({ styles1: "underline" });
                    }}
                  >
                    {ele.text}
                  </span>
                  <span>
                    Comment By:  {ele?.user?.userName}
                  </span>
                  <span>
                    Comment On:  {moment(ele?.createdOn).format("MMM Do YY")}
                  </span>
                  <button
                    style={Styles.buttonEdit}
                    onClick={e => this.edit(ele.text, ele._id)}
                  >
                    edit
                  </button>
                  <button
                    style={Styles.buttonEdit}
                    onClick={() => this.remove(ele._id)}
                  >
                    remove
                  </button>
                </div>
              ))}
          </div>
        </>
      );
    } else {
      return (
        <div>
          <div style={{ fontSize: 18, margin: 6 }}>Edit comment</div>
          <input
            style={Styles.inputUpdate}
            value={this.state.editValue}
            onChange={e => {
              this.setState({ editValue: e.target.value });
            }}
          />
          <button style={Styles.button} onClick={this.update}>
            update
          </button>

          <button
            style={Styles.button}
            onClick={() => {
              this.setState({ isEdit: false });
            }}
          >
            cancel
          </button>
        </div>
      );
    }
  }
}
