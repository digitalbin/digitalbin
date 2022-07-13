
    const toVCR = new TWEEN.Tween(vhs.position)
    .easing(easing)
    .to(viaPos, 1000)
    .chain(
        new TWEEN.Tween(vhs.rotation).easing(easing).to({ y: startRot.y + (-Math.PI * .5 - rotationOffset) }, 1000),
        // .onStart(() => vhs.rotation.set(0, 0, 0)),
        new TWEEN.Tween(vhs.position).easing(easing).to(endPos, 1000),
    )
    .onStart(() => {
        vhs.userData.active = true;
        console.log('start');
    });
= new TWEEN.Tween(vhs.position)
    .easing(easing)
    .to(viaPos, 1000)
    .chain(
        new TWEEN.Tween(vhs.rotation)
            .easing(easing)
            .to({ y: startRot.y }, 1000),
        new TWEEN.Tween(vhs.position)
            .easing(easing)
            .to(startPos, 1000)
            .onComplete(() => {
                console.log('complete');
                vhs.userData.active = false;
            }),
    );

vhs.userData.anims = {
    toVCR,
    fromVCR,
};