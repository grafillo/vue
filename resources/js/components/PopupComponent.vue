<template >
    <div class="popup-overlay">
        <div class="popup-content">
    Вы хотите удалить статью навсегда:
        <button @click="selectAnswer('no')" class='btn btn-warning btn-sm'>Нет</button>
        &nbsp
        <button @click="selectAnswer('yes')" class='btn btn-danger btn-sm'>Да</button>
        </div>
    </div>

</template>

<script>
export default {
    emits: ['popupSent'], // Объявляем событие
    name: "PopupComponent",
    methods:{
        selectAnswer(event){
            this.$emit('popupSent', event);
        }
    }
}
</script>

<style scoped>
.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}
.popup-content {
    background-color: white; /* Белый фон */
    padding: 20px;
    border-radius: 8px; /* Закругленные углы */
    border: 2px solid #ccc; /* Рамка серого цвета */
    box-shadow: 0px 4px 10px rgba(0,0,0,0.1); /* Тень для эффекта поднятия */
}
</style>
