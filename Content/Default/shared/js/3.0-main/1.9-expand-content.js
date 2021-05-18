
$( document ).ready(() => {
    const $sectionEl = $('.js-expand');  
    
    const $contentEl = $sectionEl.find('.js-expand-content');
    const $expandButtonEl = $sectionEl.find('.js-expand-button');
    const $collapseButtonEl = $sectionEl.find('.js-collapse-button');

    const heightDefault = $contentEl.height();

    if (heightDefault > 300) {

        $contentEl.height('300px');

        $expandButtonEl.on('click', () => {
            $contentEl.css('height', heightDefault);
            $contentEl.addClass('active');
            $collapseButtonEl.removeClass('hidden');
            $expandButtonEl.addClass('hidden');
        })

        $collapseButtonEl.on('click', () => {
            $contentEl.height('300px');
            $contentEl.removeClass('active');
            $expandButtonEl.removeClass('hidden');
            $collapseButtonEl.addClass('hidden');
        })
    } else {
        $expandButtonEl.addClass('hidden');
        $contentEl.addClass('active');
    }
});