import "./src/ts/app.js";
 export default class CustomTodo extends HTMLElement {
    container: Element | null = null;
  
    constructor() {
      super();
      //this.root= this.attackshadow({mode:''open});
    }
  
    connectedCallback() {
      const div = this.render();
  
      if (div) this.insertAdjacentElement('afterend', div);
  
      // Appel à la méthode listeners()
      this.listeners();
  
      this.container = div;
    }
  
    listeners() {
        const btnAdd = this.container?.querySelector('#btnAdd');
        const modal = this.container?.querySelector('#modal');
        const crossBtn = modal?.querySelector('.cross');
        const libelleField = modal?.querySelector('#libelle') as HTMLInputElement;
  const checkedField = modal?.querySelector('#check-form') as HTMLInputElement;
        const submitBtn = modal?.querySelector('#submit');
        const checkedFilter = this.container?.querySelector('#check');
      

        if (btnAdd && modal && crossBtn && libelleField && checkedField && submitBtn && checkedFilter) {
          btnAdd.addEventListener('click', function (e) {
            submitBtn.textContent = 'Ajouter';
            libelleField.value = "";
            checkedField.checked = false;
            modal.classList.toggle('show');
          });
          crossBtn.addEventListener('click', function (e) {
            modal.classList.toggle('show');
          });
          submitBtn.addEventListener('click', function (e) {
            if (libelleField.value == "") {
              alert("Le champ libelle ne doit pas être vide!");
              return;
            }
            // ...
          });
          checkedFilter.addEventListener("click", function (e) {
            // ...
          });
        }
      }
  
    render() {
      const div = document.createElement('div');
      div.innerHTML = `
        <header>
          <div class="logo">TODO</div>
          <i class="fa fa-bars"></i>
        </header>
  
        <div class="todos">
          <div class="header">
            <div class="form-group">
              <input type="text" placeholder="rechercher une tache">
            </div>
            <span>
              <input id="check" type="checkbox">
              <label for="check">Terminer ?</label>
            </span>
          </div>
          <div class="todos-list">
          </div>
        </div>
  
        <button id="btnAdd" class="btn btn-add" type="button">+</button>
  
        <div class="modal" id="modal">
          <div class="card">
            <div class="cross">x</div>
            <div class="form-group">
              <input type="text" id="libelle" placeholder="ajouter une todos">
            </div>
            <span>
              <input id="check-form" type="checkbox">
              <label for="check-form">Terminer ?</label>
            </span>
            <button class="btn btn-submit" id="submit" type="button">AJOUTER</button>
          </div>
        </div>
  
        <script>var exports = {"__esModule": true};</script>
        <script type="module" src="./src/ts/app.js"></script>
      `;
  
      return div;
    }
  }
  