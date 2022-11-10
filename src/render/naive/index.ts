import {
    create,
    NConfigProvider,
    NMessageProvider,
    NDialogProvider,
    NButton
} from 'naive-ui'

/**
 * naive-Ui 
 */
const naive = create({
    components: [
        NConfigProvider,
        NMessageProvider,
        NDialogProvider,
        NButton
    ]
})

export default naive