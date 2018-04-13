'use strict';

let articleView = {};

// TODO: Where possible, refactor methods into arrow functions, including the document.ready() method at the bottom.

// COMMENT: How do arrow functions affect the context of "this"? How did you determine if a function could be refactored?
// PUT YOUR RESPONSE HERE

articleView.populateFilters = ()=> {
  $('article').each(function() {
    let authorObj = {};
    let categoryObj = {};
    let authorSrc = $('#author-filter-template').html();
    let categorySrc = $('#category-filter-template').html();
    let authorTemplate = Handlebars.compile(authorSrc);
    let categoryTemplate = Handlebars.compile(categorySrc);

    if (!$(this).hasClass('template')) {
      let $val = $(this).find('address a').text();
      authorObj.author = $val;
      $('#author-filter').append(authorTemplate(authorObj));
    
      // let optionTag = `<option value="${$val}">${$val}</option>`;

      // if ($(`#author-filter option[value="${$val}"]`).length === 0) {
      //   $('#author-filter').append(optionTag);
      // }


      $val = $(this).attr('data-category');
      categoryObj.category = $val;
      $('#category-filter').append(categoryTemplate(categoryObj));

      // if ($(`#category-filter option[value="${$val}"]`).length === 0) {
      //   $('#category-filter').append(optionTag);
      // }
    }
  });
};

articleView.handleAuthorFilter = ()=> {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $(`article[data-author="${$(this).val()}"]`).fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = ()=>  {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $(`article[data-category="${$(this).val()}"]`).fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#author-filter').val('');
  });
};

articleView.handleMainNav = ()=> {
  $('.main-nav').on('click', '.tab', function(e) {
    e.preventDefault();
    $('.tab-content').hide();
    $(`#${$(this).data('content')}`).fadeIn();
  });

  $('.main-nav .tab:first').click();
};

articleView.setTeasers = ()=> {
  $('.article-body *:nth-of-type(n+2)').hide();
  $('article').on('click', 'a.read-on', function(e) {
    e.preventDefault();
    if ($(this).text() === 'Read More →') {
      $(this).parent().find('*').fadeIn();
      $(this).html('Show Less &larr;');
    } else {
      $('body').animate({
        scrollTop: ($(this).parent().offset().top)
      },200);
      $(this).html('Read More &rarr;');
      $(this).parent().find('.article-body *:nth-of-type(n+2)').hide();
    }
  });
};

$(document).ready(()=> {
  articleView.populateFilters();
  articleView.handleCategoryFilter();
  articleView.handleAuthorFilter();
  articleView.handleMainNav();
  articleView.setTeasers();
})
