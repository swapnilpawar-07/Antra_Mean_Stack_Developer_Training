const Api = (() => {
    const url = "http://localhost:4232/courseList";
    const fetchCourses = fetch(url).then(r => r.json());
    return { fetchCourses };
})();

const View = (() => {
    const dom = {
        available: document.querySelector("#available"),
        chosen: document.querySelector("#chosen"),
        total: document.querySelector("#creditTotal"),
        selectBtn: document.querySelector("#btnSelect")
    };
    const createTMP = (list, selectedIds = new Set(), selectable = true) => {
        let t = "";
        list.forEach(c => {
        const on = selectedIds.has(c.courseId) && selectable;
        t += `
            <div class="course${on ? " is-selected" : ""}" data-id="${c.courseId}">
            <p class="row">${c.courseName}</p>
            <p class="meta">Course Type : ${c.required ? "Compulsory" : "Elective"}</p>
            <p class="meta">Course Credit : ${c.credit}</p>
            </div>
        `;
        });
        return t;
    };
    const render = (el, html) => { el.innerHTML = html; };
    const renderTotal = n => { dom.total.textContent = n; };
    const setButtonEnabled = on => { dom.selectBtn.disabled = !on; };
    return { dom, createTMP, render, renderTotal, setButtonEnabled };
})();

const Model = ((view, api) => {
    const { dom, createTMP, render, renderTotal, setButtonEnabled } = view;
    const { fetchCourses } = api;
    const CAP = 18;

    class Courses {
        #all;
        #selected;
        #submitted;
        #locked;
        constructor(){
        this.#all = [];
        this.#selected = new Set();
        this.#submitted = [];
        this.#locked = false;
        }
        set all(v){
        this.#all = v;
        this.updateViews();
        }
        get all(){ return this.#all; }

        toggle(id){
        if (this.#locked) return;
        if (this.#selected.has(id)) {
            this.#selected.delete(id);
            this.updateViews();
            return;
        }
        const c = this.#all.find(x => x.courseId === id);
        const next = this.totalCredits() + (c ? c.credit : 0);
        if (next > CAP) {
            alert("You can only choose up to 18 credits in one semester");
            return;
        }
        this.#selected.add(id);
        this.updateViews();
        }

        totalCredits(){
        let s = 0;
        for (const id of this.#selected) {
            const c = this.#all.find(x => x.courseId === id);
            if (c) s += c.credit || 0;
        }
        return s;
        }

        compulsoryCountSelected(){
        let n = 0;
        for (const id of this.#selected) {
            const c = this.#all.find(x => x.courseId === id);
            if (c && c.required) n++;
        }
        return n;
        }

        confirmAndSubmit(){
        if (this.#locked) return;
        if (this.compulsoryCountSelected() < 4) {
            alert("Please select at least 4 compulsory courses");
            return;
        }
        const total = this.totalCredits();
        const msg = `You have chosen ${total} credits for this semester. You cannot change once you submit. Do you want to confirm?`;
        if (!confirm(msg)) return;
        const chosen = this.#all.filter(c => this.#selected.has(c.courseId));
        this.#submitted = chosen.slice();
        this.#all = this.#all.filter(c => !this.#selected.has(c.courseId));
        this.#selected.clear();
        this.#locked = true;
        setButtonEnabled(false);
        this.updateViews();
        }

        updateViews(){
        render(dom.available, createTMP(this.#all, this.#selected, !this.#locked));
        render(dom.chosen, createTMP(this.#submitted, new Set(), false));
        renderTotal(this.totalCredits());
        }
    }

    return { Courses, fetchCourses };
})(View, Api);

const Controller = ((model, view) => {
    const { Courses, fetchCourses } = model;
    const { dom, setButtonEnabled } = view;
    const courseList = new Courses();

    const init = () => {
        fetchCourses.then(data => {
        const list = Array.isArray(data) ? data : (data.courseList || []);
        courseList.all = list;
        setButtonEnabled(true);
        });
    };

    const bind = () => {
        dom.available.addEventListener("click", e => {
        const row = e.target.closest(".course");
        if (!row) return;
        courseList.toggle(Number(row.dataset.id));
        });
        dom.selectBtn.addEventListener("click", () => {
        courseList.confirmAndSubmit();
        });
    };

    const bootstrap = () => {
        init();
        bind();
    };
    return { bootstrap };
})(Model, View);

Controller.bootstrap();
