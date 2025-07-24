// src/classes/Die.js
export class Die {
    constructor(faces) {
      if (!Array.isArray(faces) || faces.length === 0)
        throw new Error("Die must have a non-empty array of faces.");
      this.faces = faces;
    }
  
    getFace(index) {
      return this.faces[index];
    }
  
    getNumberOfFaces() {
      return this.faces.length;
    }
  
    getAllFaces() {
      return this.faces;
    }
  }
  