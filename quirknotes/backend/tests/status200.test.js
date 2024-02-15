test("1+2=3, empty array is empty", () => {
  expect(1 + 2).toBe(3);
  expect([].length).toBe(0);
});

const SERVER_URL = "http://localhost:4000";

test("/postNote - Post a note", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");

  await fetch(`${SERVER_URL}/deleteAllNotes`, { method: "DELETE" });
});

test("/getAllNotes - Return list of two notes for getAllNotes", async () => {
  for (let i = 0; i < 2; i++) {
    await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: `note # ${i}`,
        content: "content",
      }),
    });
  }

  const allNotesRes = await fetch(`${SERVER_URL}/getAllNotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const allNotesBody = await allNotesRes.json();

  expect(allNotesRes.status).toBe(200);
  expect(allNotesBody.response.length).toBe(2);

  await fetch(`${SERVER_URL}/deleteAllNotes`, { method: "DELETE" });
});

test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {
  const allNotesRes = await fetch(`${SERVER_URL}/getAllNotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const allNotesBody = await allNotesRes.json();

  expect(allNotesRes.status).toBe(200);
  expect(allNotesBody.response.length).toBe(0);
});

test("/deleteNote - Delete a note", async () => {
  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "hello world",
      content: "world hello",
    }),
  });
  const postNoteBody = await postNoteRes.json();

  const deleteNoteRes = await fetch(
    `${SERVER_URL}/deleteNote/${postNoteBody.insertedId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  expect(deleteNoteRes.status).toBe(200);
});

test("/patchNote - Patch with content and title", async () => {
  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "hello world",
      content: "world hello",
    }),
  });
  const postNoteBody = await postNoteRes.json();

  const patchNoteRes = await fetch(
    `${SERVER_URL}/patchNote/${postNoteBody.insertedId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "new",
        content: "new",
      }),
    },
  );

  expect(patchNoteRes.status).toBe(200);
  await fetch(`${SERVER_URL}/deleteAllNotes`, { method: "DELETE" });
});

test("/patchNote - Patch with just title", async () => {
  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "hello world",
      content: "world hello",
    }),
  });
  const postNoteBody = await postNoteRes.json();

  const patchNoteRes = await fetch(
    `${SERVER_URL}/patchNote/${postNoteBody.insertedId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "new",
      }),
    },
  );

  expect(patchNoteRes.status).toBe(200);
  await fetch(`${SERVER_URL}/deleteAllNotes`, { method: "DELETE" });
});

test("/patchNote - Patch with just content", async () => {
  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "hello world",
      content: "world hello",
    }),
  });
  const postNoteBody = await postNoteRes.json();

  const patchNoteRes = await fetch(
    `${SERVER_URL}/patchNote/${postNoteBody.insertedId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: "new",
      }),
    },
  );

  expect(patchNoteRes.status).toBe(200);
  await fetch(`${SERVER_URL}/deleteAllNotes`, { method: "DELETE" });
});

test("/deleteAllNotes - Delete one note", async () => {
  await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "hello world",
      content: "world hello",
    }),
  });

  const deleteNoteRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const deleteNoteBody = await deleteNoteRes.json();

  expect(deleteNoteRes.status).toBe(200);
  expect(deleteNoteBody.response).toContain("1");
});

test("/deleteAllNotes - Delete three notes", async () => {
  for (let i = 0; i < 3; i++) {
    await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: `note # ${i}`,
        content: "content",
      }),
    });
  }

  const deleteNoteRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const deleteNoteBody = await deleteNoteRes.json();

  expect(deleteNoteRes.status).toBe(200);
  expect(deleteNoteBody.response).toContain("3");
});

test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Color",
      content: "IS",
    }),
  });
  const postNoteBody = await postNoteRes.json();

  const patchNoteRes = await fetch(
    `${SERVER_URL}/updateNoteColor/${postNoteBody.insertedId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        color: "#FF0000",
      }),
    },
  );

  expect(patchNoteRes.status).toBe(200);
  await fetch(`${SERVER_URL}/deleteAllNotes`, { method: "DELETE" });
});
