import { defineCustomElement, h, createApp, getCurrentInstance } from 'vue'

export const vueDefineCustomElement = (component, { plugins = [] } = {}) =>
  defineCustomElement({
    ...component,
    setup(props) {
      const app = createApp(component)

      plugins.forEach(app.use)

      const inst = getCurrentInstance()
      Object.assign(inst.appContext, app._context)
      Object.assign(inst.provides, app._context.provides)

      return () =>
        h(component, {
          ...props,
        })
    },
  })
