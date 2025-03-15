import { Category } from './category';

export class SubCategory {
  id: number;
  name: string;
  category: Category;

  constructor(name: string, category: Category, id: number) {
    this.name = name;
    this.category = category;
    this.id = id;
  }
}
