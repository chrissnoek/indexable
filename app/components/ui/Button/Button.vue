<template>
    <button
        :class="buttonClasses"
        :disabled="disabled"
        v-bind="$attrs"
        @click="$emit('click', $event)"
    >
        <span class="btn__label"><slot /></span>
    </button>
</template>

<script setup lang="ts">
import { ButtonVariant, ButtonSize, type ButtonProps } from './types';

const props = withDefaults(defineProps<ButtonProps>(), {
    variant: ButtonVariant.Primary,
    size: ButtonSize.MD,
    disabled: false,
});

defineEmits<{
    click: [event: Event];
}>();

const buttonClasses = computed(() => {
    const variantClasses: Record<ButtonVariant, string> = {
        [ButtonVariant.Primary]: 'btn--primary',
        [ButtonVariant.Secondary]: 'btn--ink',
        [ButtonVariant.Outline]: 'btn--ghost-ink',
        [ButtonVariant.Ghost]: 'btn--ghost',
    };

    const sizeClasses: Record<ButtonSize, string> = {
        [ButtonSize.XS]: 'btn--sm',
        [ButtonSize.SM]: 'btn--sm',
        [ButtonSize.MD]: '',
        [ButtonSize.LG]: 'btn--lg',
    };

    return ['btn', variantClasses[props.variant!], sizeClasses[props.size!]]
        .filter(Boolean)
        .join(' ');
});
</script>
