<template>
  <input 
    ref="input"
    class="ol-field__input" 

    :maxlength="maxlength"
    :type="inputType"
    :value="entry"

    @blur="onblur"
    @focus="onfocus"
    @input="oninput"
    @keyup.enter.stop="submit">
</template>

<script lang="ts">
import {Component, Prop, Watch} from 'vue-property-decorator'
import Vue from 'vue'

@Component
export default class Entry extends Vue {

  @Prop({type: Boolean , default: false})
  readonly focused!: boolean; 

  @Prop({type: Boolean, default: false})
  readonly  hidden!: boolean;
  
  @Prop({type: String, default: 'text'})
  readonly type!: string;

  @Prop({type: String, default: ''})
  readonly entry!: string;
  
  @Prop({type: Number,  default: null})
  readonly maxlength!: number|null;

  private blurTimeout: NodeJS.Timeout|null = null;

  private blurDelay = 200;

  private $focused = false;

  get inputType(): string {
    return this.hidden ? 'password' : this.type;
  }

  get input(): HTMLInputElement|null {
    return this.$el instanceof HTMLInputElement ? 
      this.$el : null; 
  }

  @Watch('focused') 
  onFocusChange(value: boolean) {
    if (value === this.$focused)
      return;

    if (value)  
      this.input?.focus();
    else
      this.input?.blur();
  } 
  
  preventBluring(): void {
    if (this.blurTimeout === null)
      return;
      
    clearTimeout(this.blurTimeout);
    this.blurTimeout = null;
  }

  onfocus(): void {
    this.$focused = true;

    this.preventBluring();
    this.$emit('update:focused', true);
  }

  onblur(): void {
    this.$focused = false;

    this.preventBluring();
    this.$emit('validate');
      
    this.blurTimeout = setTimeout(() => 
      this.$emit('update:focused', false), this.blurDelay);
  }

  oninput(event: InputEvent): void {
    let value = this.input?.value || '';
    this.$emit('update:entry', value);
  }

  submit(): void {
    this.$emit('submit');
  } 
}
</script>