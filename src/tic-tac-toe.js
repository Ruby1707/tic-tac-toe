class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.configuration=config;
        this.newState=this.configuration.initial;
        this.history=[];
        this.point=this.configuration.states.length
        this.states = Object.keys(config.states);
        this.prevState = null;
        this.count = 0;
        this.history.push(this.newState);
        this.canRedo = false;
    }

    getState() {
      return this.newState;
    }

    changeState(state) {
      if(this.states.indexOf(state)<0){
        throw new Error();
      }
      else{
        this.prevState = this.newState;
        this.newState = state;
      }
      this.count++;
      this.history.push(this.newState);
      this.canRedo = false;
      this.history.push(state);
    }

    trigger(event) {
       if (this.configuration.states[this.newState].transitions[event] === undefined) throw new Error();
       else{
         this.prevState = this.newState;
         this.newState = this.configuration.states[this.newState].transitions[event];
       }
       this.history.push(this.newState);
       this.count++;
       this.canRedo = false;
       }


    /**
     * Resets FSM state to initial.
     */
    reset() {
      this.newState=this.configuration.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
      let arr=[];
      if(event==undefined){
        return this.states;
      }
      else{
         for (var key in this.configuration.states) {
           for (var key1 in this.configuration.states[key].transitions) {
             if(key1==event){
               arr.push(key);
             }
           }
         }
         return arr;
       }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
      this.count++;
      if (this.count <= 1 ) return false;
      if (this.newState === this.configuration.initial) return false;
      const tmp = this.newState;
      this.newState = this.prevState;
      this.prevState = tmp;
      this.canRedo = true;
      return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
      if(this.canRedo==false){
        return false;
      }
      this.count--;
      if (this.count <= 0) return false;
      const tmp = this.newState;
      this.newState = this.prevState;
      this.prevState = tmp;
      return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
      this.count=0;
    }
}

module.exports = FSM;
