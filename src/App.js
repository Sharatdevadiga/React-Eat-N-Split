import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [ShowAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleAddFriend(friend) {
    setFriends([...friends, friend]);
    setShowAddFriend(false);
  }

  function handleAddFriendForm() {
    setShowAddFriend((show) => !show);
  }

  function handleSelectFriend(friend) {
    selectedFriend?.id === friend.id
      ? setSelectedFriend(null)
      : setSelectedFriend(friend);

    setShowAddFriend(false);
  }

  return (
    <>
      <header>
        <h1>EAT_N_SPLIT</h1>
      </header>
      <div className="app">
        <div className="sidebar">
          <FriendsList
            friends={friends}
            onSelectFriend={handleSelectFriend}
            selectedFriend={selectedFriend}
          ></FriendsList>

          {ShowAddFriend && (
            <FormAddFriend onAddFriend={handleAddFriend}></FormAddFriend>
          )}

          <Button onClick={handleAddFriendForm}>
            {!ShowAddFriend ? "Add friend" : "Close"}
          </Button>
        </div>

        {selectedFriend && (
          <FormSplitBill selectedFriend={selectedFriend}></FormSplitBill>
        )}
      </div>
    </>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FriendsList({ friends, onSelectFriend, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelectFriend={onSelectFriend}
          selectedFriend={selectedFriend}
        ></Friend>
      ))}
    </ul>
  );
}

function Friend({ friend, onSelectFriend, selectedFriend }) {
  return (
    <li className={selectedFriend?.id === friend.id ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />

      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.balance} to {friend.name}
        </p>
      )}

      {friend.balance > 0 && (
        <p className="green">
          {friend.name} ows you {friend.balance}
        </p>
      )}

      {friend.balance === 0 && <p> You and {friend.name} are even</p>}

      <Button onClick={() => onSelectFriend(friend)}>
        {selectedFriend?.id === friend.id ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;

    let id = crypto.randomUUID();
    const newFriend = {
      name,
      image: `${image}?u=${id}`,
      id,
      balance: 0,
    };

    onAddFriend(newFriend);
  }

  return (
    <form className="form-add-friend" onSubmit={(e) => handleSubmit(e)}>
      <label>👲Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>

      <label>📷 Image Url</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      ></input>

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend }) {
  return (
    <form className="form-split-bill">
      <h2>Split bill with {selectedFriend?.name}</h2>

      <label>💰 Bill Value</label>
      <input type="text"></input>

      <label>🧍‍♀️ Your Expense</label>
      <input type="text"></input>

      <label>👲 {selectedFriend?.name}'s Expense</label>
      <input type="text" disabled></input>

      <label>💵 Who is paying the bill</label>
      <select>
        <option value="user">You</option>
        <option calue="friend">Friend</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}
