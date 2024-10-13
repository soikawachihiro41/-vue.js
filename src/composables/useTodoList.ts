import { computed, ref } from 'vue';

export const useTodoList = () => {

  // Todoリストを保持するref
  const todoList = ref<{ id: number; task: string; checked: boolean }[]>([]);

  // localStorageからTodoリストを読み込む
  const ls = localStorage.todoList;
  todoList.value = ls ? JSON.parse(ls) : [];


  // 特定のIDのTodoを検索する関数
  const findById = (id: number) => {
    return todoList.value.find((todo) => todo.id === id);
  };

  // 特定のIDのインデックスを検索する関数
  const findIndexById = (id: number) => {
    return todoList.value.findIndex((todo) => todo.id === id);
  };

  const add = (task: string) => {
    const id = new Date().getTime();
    todoList.value.push({ id, task, checked: false });
    localStorage.todoList = JSON.stringify(todoList.value);
  };

  const editID = ref(-1);

  const show = (id: number) => {
    const todo = findById(id);
    editID.value = id;
    return todo?.task;
  };

  // Todoの内容を編集する関数
  const edit = (task: string) => {
    const todo = findById(editID.value);
    const idx = findIndexById(editID.value);

    if (todo) {
      todo.task = task;
      todoList.value.splice(idx, 1, todo);
      localStorage.todoList = JSON.stringify(todoList.value);
      editID.value = -1;
    }
  };

  // Todoを削除する関数
  const del = (id: number) => {
    const todo = findById(id);
    if (todo) {
      const delMsg = '「' + todo.task + '」を削除しますか？';
      if (!confirm(delMsg)) return;

      const idx = findIndexById(id);
      todoList.value.splice(idx, 1);
      localStorage.todoList = JSON.stringify(todoList.value);
    }
  };

  // Todoのチェックを切り替える関数
  const check = (id: number) => {
    const todo = findById(id);
    const idx = findIndexById(id);

    if (todo) {
      todo.checked = !todo.checked;
      todoList.value.splice(idx, 1, todo);
      localStorage.todoList = JSON.stringify(todoList.value);
    }
  };

  // 完了したTodoの数をカウントする計算プロパティ
  const countFin = computed(() => {
    const finArr = todoList.value.filter((todo) => todo.checked);
    return finArr.length;
  });

  return { todoList, add, show, edit, del, check, countFin };
};
