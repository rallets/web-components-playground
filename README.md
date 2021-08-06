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

## Enabling support for `slot`

- to be able to customize the web component behaviour via named `slot`, we need to switch the component's encapsulation to ShadowDom.
Nb. If not, the `slot` content will be appended to the web component.

`encapsulation: ViewEncapsulation.ShadowDom,`

- and define a `slot` in the component html:
`<slot name="header"><p>Default text header</p></slot>`

- Then in the web component instance we can overwrite the default content, for example for a slot named "header":

``` html
<text-form>
  <span slot="header">My Custom Header</span>
</text-form>
```

## Customize elements with `part`

- to allow the web component consumer to customize the css, we should expose the allowed elements to be customized via the `part` declaration.
NB. I just used the same name `header` here for `part` and `slot`, but you can use any name you want and they must not match.

- `part` allow to style only that specific element, and doesn't allow to style his children.
For that, take a look to `exportparts` and `::theme`.
For example: <https://meowni.ca/posts/part-theme-explainer/>

`<slot name="header" part="header"><p>Default text header</p></slot>`

- and then customize the instances via css

``` html
<style>
#ctrl::part(header) {
  font-size: 32px;
}
</style>
<body>
  <text-form id="ctrl"></text-form>
</body>
```

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

## Using as Web component in a standard Angular application

- Build the web component project
- Include the web component javascript output in angular.json > scripts > main.js

Then you can use the web component in two different ways:

1- You can use the web component in Angular Template, but you need to use `ElementRef`, `addEventListener`, in addition of some "manual handling" to listen to events. Based on <https://stackoverflow.com/a/41610950/3512682>

2- My preferred way is to use an `Angular directive` to wrap the web component and use it as a `Angular Form Control` and benefit of the native Angular framework functionality, as validators, ngModel, etc.
Based on <https://coryrylan.com/blog/using-web-components-in-angular-forms>
