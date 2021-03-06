/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
/*global pavlov:false, describe:false, before:false, after:false*/
/*global it:false, given:false assert:false, async:false, resume:false, wait:false*/

(function($) {

  pavlov.specify.extendAssertions({

    throwsNoMethodError: function(actual) {
    },

    isChecked: function(actual, expected, message) {
      actual.each(function() {
        strictEqual($(this).prop('checked'), true, 'asserting checkbox is checked');
      });
    },

    isNotChecked: function(actual, expected, message) {
      actual.each(function() {
        strictEqual($(this).prop('checked'), false, 'asserting checkbox is not checked');
      });
    },

    isDisabled: function(actual, expected, message) {
      actual.each(function() {
        strictEqual($(this).prop('disabled'), true, 'asserting checkbox is disabled');
      });
    },

    isNotDisabled: function(actual, expected, message) {
      actual.each(function() {
        strictEqual($(this).prop('disabled'), false, 'asserting checkbox is not disabled');
      });
    },

    isIndeterminate: function(actual, expected, message) {
      actual.each(function() {
        strictEqual($(this).prop('indeterminate'), true, 'asserting checkbox is indeterminate');
      });
    },

    isNotIndeterminate: function(actual, expected, message) {
      actual.each(function() {
        strictEqual($(this).prop('indeterminate'), false, 'asserting checkbox is not indeterminate');
      });
    }

  });

  pavlov.specify("jQuery.$checkallbox", function() {

    describe("method", function() {

      var $elems;

      before(function() {
        $elems = $('#qunit-fixture').children();
      });

      it("should be chainable", function() {
        assert($elems.checkallbox()).equals($elems);
      });

      describe("calls", function() {

        var $checkallbox, msg;

        before(function() {
          $checkallbox = $elems.checkallbox();
        });

        describe("_updateCheckallbox", function() {
          it("should not be accessible", function() {
            assert(function() {
              $checkallbox.checkallbox('_updateCheckallbox');
            }).throwsException(new Error("Method '_updateCheckallbox' does not exist on checkallbox"));
          });
        });

        describe("_updateCheckboxes", function() {
          it("should not be accessible", function() {
            assert(function() {
              $checkallbox.checkallbox('_updateCheckboxes');
            }).throwsException(new Error("Method '_updateCheckboxes' does not exist on checkallbox"));
          });
        });

        describe("update", function() {
          it("should be accessible", function() {
            assert($checkallbox.checkallbox('update')).pass();
          });
        });

      });

    });


    describe ("defaults", function() {

      it("should be defined", function() {
        assert($.fn.checkallbox.options).isDefined();
      });

      it("should define 'scope'", function() {
        assert($.fn.checkallbox.options.scope).isEqualTo('form');
      });

    });

    describe("with an empty form", function() {
      var $form, $checkallbox;

      before(function() {
        $form        = $('#qunit-fixture').find('form#empty');
        $checkallbox = $('<input type="checkbox"/>').prependTo($form).checkallbox();
      });

      describe("checkallbox", function() {

        it("should not be checked", function() {
          assert($checkallbox).isNotChecked();
        });

        it("should be disabled", function() {
          assert($checkallbox).isDisabled();
        });

        it("should not be indeterminate", function() {
          assert($checkallbox).isNotIndeterminate();
        });

        describe("having called 'update' after checkbox added", function() {

          before(function() {
            $form.append($("<input type='checkbox' checked='checked'/>"));
            $checkallbox.checkallbox('update');
          });

          it("should be checked", function() {
            assert($checkallbox).isChecked();
          });

          it("should not be disabled", function() {
            assert($checkallbox).isNotDisabled();
          });

        });

      });

    });

    describe("with a form with two checkboxes", function() {
      var $form, $checkallbox, $checkboxes;

      before(function() {
        $form       = $('#qunit-fixture').find('form#two-checkboxes');
        $checkboxes = $form.find(':checkbox');
      });

      // Checked/indeterminate state
      describe("neither of which are checked", function() {

        before(function() {
          $form.find(':checkbox').prop("checked", false);
          $checkallbox = $('<input type="checkbox"/>').prependTo($form).checkallbox();
        });

        describe("checkallbox", function() {

          it("should not be checked", function() {
            assert($checkallbox).isNotChecked();
          });

          it("should not be indeterminate", function() {
            assert($checkallbox).isNotIndeterminate();
          });

          describe("when checked", function() {

            before(function() {
              $checkallbox.prop('checked', true).change();
            });

            it("should check the checkboxes", function() {
              assert($checkboxes).isChecked();
            });

          });

        });

      });

      describe("one of which is checked", function() {

        before(function() {
          $form.find(':checkbox').first().prop("checked", true);
          $checkallbox = $('<input type="checkbox"/>').prependTo($form).checkallbox();
        });

        describe("checkallbox", function() {

          it("should not be checked", function() {
            assert($checkallbox).isNotChecked();
          });

          it("should be indeterminate", function() {
            assert($checkallbox).isIndeterminate();
          });

          describe("when checked", function() {

            before(function() {
              $checkallbox.prop('checked', true).change();
            });

            it("should check the checkboxes", function() {
              assert($checkboxes).isChecked();
            });

          });

        });

      });

      describe("both of which are checked", function() {

        before(function() {
          $form.find(':checkbox').prop("checked", true);
          $checkallbox = $('<input type="checkbox"/>').prependTo($form).checkallbox();
        });

        describe("checkallbox", function() {

          it("should be checked", function() {
            assert($checkallbox).isChecked();
          });

          it("should not be indeterminate", function() {
            assert($checkallbox).isNotIndeterminate();
          });

          describe("when unchecked", function() {

            before(function() {
              $checkallbox.prop('checked', false).change();
            });

            it("should uncheck the checkboxes", function() {
              assert($checkboxes).isNotChecked();
            });

          });

        });

      });

      // Disabled state
      describe("one of which is disabled", function() {

        before(function() {
          $checkboxes.first().prop("disabled", true);
        });

        describe("checkallbox", function() {

          before(function() {
            $checkallbox = $('<input type="checkbox"/>').prependTo($form).checkallbox();
          });

          it("should not be disabled", function() {
            assert($checkallbox).isNotDisabled();
          });

          describe("when checked", function() {

            before(function() {
              $checkallbox.prop('checked', true).change();
            });

            it("should not check the disabled checkboxes", function() {
              assert($checkboxes.filter(':disabled')).isNotChecked();
            });

            it("should check the enabled checkboxes", function() {
              assert($checkboxes.filter(':enabled')).isChecked();
            });
          });

        });

        describe("the other of which is checked", function() {

          before(function() {
            $checkboxes.last().prop("checked", true);
          });

          describe("checkallbox", function() {

            before(function() {
              $checkallbox = $('<input type="checkbox"/>').prependTo($form).checkallbox();
            });

            it("should be checked", function() {
              assert($checkallbox).isChecked();
            });

            describe("when unchecked", function() {

              before(function() {
                $checkallbox.prop('checked', false).change();
              });

              it("should uncheck the enabled checkboxes", function() {
                assert($checkboxes.filter(':enabled')).isNotChecked();
              });
            });

          });

        });

      });

      describe("both of which are disabled", function() {

        before(function() {
          $form.find(':checkbox').prop("disabled", true);
          $checkallbox = $('<input type="checkbox"/>').prependTo($form).checkallbox();
        });

        describe("checkallbox", function() {

          it("should be disabled", function() {
            assert($checkallbox).isDisabled();
          });

          it("should not be checked", function() {
            assert($checkallbox).isNotChecked();
          });
        });

      });

    });

    describe("with a form with two fieldsets", function() {
      var $form, $checkallboxes;

      before(function() {
        $form = $('#qunit-fixture').find('form#two-fieldsets');
      });

      describe("scoped checkallboxes", function() {

        before(function() {
          $checkallboxes = $('<input type="checkbox"/>').prependTo($form.find('legend')).checkallbox({scope: 'fieldset'});
        });

        it("should be two in length", function() {
          assert($checkallboxes.length).isEqualTo(2);
        });

      });

      describe("the first of which contains checked checkboxes", function() {

        before(function() {
          $form.find('fieldset:first-child :checkbox').prop('checked', true);
        });

        describe("scoped checkallboxes", function() {

          before(function() {
            $checkallboxes = $('<input type="checkbox"/>').prependTo($form.find('legend')).checkallbox({scope: 'fieldset'});
          });

          it("should check first checkallbox", function() {
            assert($checkallboxes.first()).isChecked();
          });

          it("should not check last checkallbox", function() {
            assert($checkallboxes.last()).isNotChecked();
          });
        });

      });

    });

  });
}(jQuery));
