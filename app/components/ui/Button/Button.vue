<template>
    <button
        :class="buttonClasses"
        :disabled="disabled"
        v-bind="$attrs"
        @click="$emit('click', $event)"
    >
        <slot />
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
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    // Size variants
    const sizeClasses: Record<ButtonSize, string> = {
        [ButtonSize.XS]: 'px-2.5 py-1.5 text-xs',
        [ButtonSize.SM]: 'px-3 py-2 text-sm',
        [ButtonSize.MD]: 'px-4 py-2.5 text-sm',
        [ButtonSize.LG]: 'px-6 py-3 text-base',
    };
    
    // Variant classes
    const variantClasses: Record<ButtonVariant, string> = {
        [ButtonVariant.Primary]: 'bg-cyan-600 text-white hover:bg-cyan-700 focus:ring-cyan-500',
        [ButtonVariant.Secondary]: 'bg-gray-700 text-white hover:bg-gray-800 focus:ring-gray-500',
        [ButtonVariant.Outline]: 'bg-white text-gray-700 border-2 border-gray-300 hover:bg-gray-50 focus:ring-gray-500',
        [ButtonVariant.Ghost]: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
    };
    
    return [
        baseClasses,
        sizeClasses[props.size!],
        variantClasses[props.variant!],
    ].join(' ');
});
</script>