# web-components-playground

Playground for web components in Angular.

Based on:

- <https://buddy.works/tutorials/building-web-components-with-angular>

- <https://indepth.dev/posts/1116/angular-web-components-a-complete-guide>

## Angular web component

- Install Angular CLI

`npm install -g @angular/cli`

- Create an empty workspace

`ng new ag-web-components --createApplication=false`

`cd ag-web-components`

- the project name that will contains all our web components

`ng generate application WebComponents --skipInstall=true`

- Would you like to add Angular routing? `No`
- Which stylesheet format would you like to use? `SCSS`

`ng add @angular/elements`

`cd projects`

`cd web-components`

`cd src`

`cd app`

`ng generate component TextForm` (NB. the `Component` suffix is added automatically)

## Customize app.module for web components

``` typescript
@NgModule({
  declarations: [
    TextFormComponent,
  ],
  imports: [
    BrowserModule,
  ],
  entryComponents: [
    TextFormComponent
  ],
  // optional: enable the bootstrap to debug the web component
  bootstrap: [TextFormComponent],
})
export class AppModule implements DoBootstrap {

  constructor(private injector: Injector) {
    const webComponent = createCustomElement(TextFormComponent, {injector});
    customElements.define('text-form', webComponent);
  }

  ngDoBootstrap() {}
}
```

- if in the `index.html` we replace `app-root` with `app-text-form`, enabling the bootstrap-ing in the NgModule, we can also debug the web-component. Just serve as usual:

`ng serve WebComponents`

## Testing the web-component in vanilla html

- Build the web component project

`ng build WebComponents --configuration production --output-hashing none --output-path usage-vanilla/dist-static`

- install the serve package

`npm install -g serve`

- Navigate inside the `usage-vanilla` folder

`cd usage-vanilla`

Serve the index.html

`serve`

- Open `http://localhost:5000` in a browser

## Using as Angular component from source code in a standard Angular application

`ng generate application UsageAsAgComponent --skipInstall=true`

- in `app.module.ts` add `TextFormComponent` in `declarations`
- use it using the angular selector (NB. not the web component name)
- build or serve the Angular app

`ng build UsageAsAgComponent`

`ng serve UsageAsAgComponent`
