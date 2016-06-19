import Spy = jasmine.Spy;
import state from "./../state/state";
import {Todo} from "./Todo";
import {UpdateDone} from "./present-data/UpdateDone";
import {AddItem} from "./present-data/AddItem";
import {Todos} from "./Todos";

describe("Todos", () => {
    it("Handles adding a new item correctly.", () => {
        const underTest = new Todos();

        underTest.addItem("New item");

        expect(underTest.todos.length).toBe(1);
        expect(underTest.todos[0].done).toBe(false);
        expect(underTest.todos[0].text).toBe("New item");

        underTest.addItem("New item 2");
        underTest.addItem("New item 3");

        const todos = underTest.todos;
        expect(todos.length).toBe(3);
        expect(todos[0].text).toBe("New item");
        expect(todos[1].text).toBe("New item 2");
        expect(todos[2].text).toBe("New item 3");
        expect(todos[0].id).not.toEqual(todos[1].id);
        expect(todos[0].id).not.toEqual(todos[2].id);
        expect(todos[1].id).not.toEqual(todos[2].id);
    });

    it("Handles checking and unchecking items correctly.", () => {
        const underTest = new Todos();
        underTest.addItem("Go grocery shopping");
        underTest.addItem("Mow lawn");
        underTest.addItem("Wash car");
        underTest.updateDone(1, true);

        expect(underTest.todos[0].done).toBe(false);
        expect(underTest.todos[1].done).toBe(true);
        expect(underTest.todos[2].done).toBe(false);

        underTest.updateDone(0, true);

        expect(underTest.todos[0].done).toBe(true);
        expect(underTest.todos[1].done).toBe(true);
        expect(underTest.todos[2].done).toBe(false);

        underTest.updateDone(0, false);

        expect(underTest.todos[0].done).toBe(false);
        expect(underTest.todos[1].done).toBe(true);
        expect(underTest.todos[2].done).toBe(false);

        expect(() => underTest.updateDone(4, true)).toThrow();
    });

    it("Handles changing text of items correctly.", () => {
        const underTest = new Todos();
        underTest.addItem("Go grocery shopping");
        underTest.addItem("Mow lawn");
        underTest.addItem("Wash car");

        expect(underTest.todos[0].text).toBe("Go grocery shopping");
        expect(underTest.todos[1].text).toBe("Mow lawn");
        expect(underTest.todos[2].text).toBe("Wash car");

        underTest.updateText(1, "Trim hedge");

        expect(underTest.todos[0].text).toBe("Go grocery shopping");
        expect(underTest.todos[1].text).toBe("Trim hedge");
        expect(underTest.todos[2].text).toBe("Wash car");

        underTest.updateDone(0, true);

        expect(() => underTest.updateText(0, "Go furniture shopping")).toThrow();
        expect(() => underTest.updateDone(4, true)).toThrow();
    });

    it("Handles removing an item correctly.", () => {
        const underTest = new Todos();
        underTest.addItem("Go grocery shopping");
        underTest.addItem("Mow lawn");
        underTest.addItem("Wash car");

        underTest.removeItem(0);

        expect(underTest.todos.length).toBe(2);
        expect(underTest.todos[0].text).toBe("Mow lawn");

        underTest.removeItem(1);

        expect(underTest.todos.length).toBe(1);
        expect(underTest.todos[0].text).toBe("Mow lawn");
    });

    it("Removing a non-existing item doesn't fail.", () => {
        const underTest = new Todos();
        underTest.addItem("Go grocery shopping");
        underTest.addItem("Mow lawn");
        underTest.addItem("Wash car");

        expect(() => underTest.removeItem(3)).not.toThrow();
        expect(underTest.todos.length).toBe(3);

        expect(() => underTest.removeItem(-1)).not.toThrow();
        expect(underTest.todos.length).toBe(3);
    });
});