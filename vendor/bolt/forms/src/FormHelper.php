<?php

declare(strict_types=1);

namespace Bolt\BoltForms;

use Symfony\Component\Form\Form;

class FormHelper
{
    public function get(?string $format, Form $form, $values = []): ?string
    {
        if (! $format || ! $form->isSubmitted()) {
            return null;
        }

        return preg_replace_callback(
            '/{([\w]+)}/i',
            function ($match) use ($form, $values) {
                if (\array_key_exists($match[1], $form->all())) {
                    return (string) $form->get($match[1])->getData();
                }

                if (\array_key_exists($match[1], $values)) {
                    return (string) $values[$match[1]];
                }

                return '(unknown)';
            },
            $format
        );
    }
}
