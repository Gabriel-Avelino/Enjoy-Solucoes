CKEDITOR.replace('editor1', {
    extraPlugins: 'embed,autoembed,image2',
    height: 500,

    // Load the default contents.css file plus customizations for this sample.
    contentsCss: [
      'http://cdn.ckeditor.com/4.24.0-lts/full-all/contents.css',
      'https://ckeditor.com/docs/ckeditor4/4.24.0-lts/examples/assets/css/widgetstyles.css'
    ],
    // Setup content provider. See https://ckeditor.com/docs/ckeditor4/latest/features/media_embed
    embed_provider: '//ckeditor.iframe.ly/api/oembed?url={url}&callback={callback}',

    // Configure the Enhanced Image plugin to use classes instead of styles and to disable the
    // resizer (because image size is controlled by widget styles or the image takes maximum
    // 100% of the editor width).
    image2_alignClasses: ['image-align-left', 'image-align-center', 'image-align-right'],
    image2_disableResizer: true,
    removeButtons: 'PasteFromWord'
  });